import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from 'react';
import dayjs from 'dayjs';

import { useSettings } from './SettingsContext';
import { getMvpRespawnTime, getServerData } from '../utils';
import {
  saveActiveMvpsToFirebase,
  subscribeToActiveMvps,
  removeMvpFromFirebase,
} from '@/controllers/mvp';

interface MvpProviderProps {
  children: ReactNode;
}

interface MvpsContextData {
  activeMvps: IMvp[];
  allMvps: IMvp[];
  editingMvp: IMvp | undefined;
  isLoading: boolean;
  resetMvpTimer: (mvp: IMvp) => void;
  killMvp: (mvp: IMvp, time?: Date | null) => void;
  removeMvpByMap: (mvpID: number, deathMap: string) => void;
  setEditingMvp: (mvp: IMvp) => void;
  closeEditMvpModal: () => void;
  updateMvpPosition: (mvpId: number, deathMap: string, position: IMapMark) => void;
}

export const MvpsContext = createContext({} as MvpsContextData);

export function MvpProvider({ children }: MvpProviderProps) {
  const { server } = useSettings();

  const [isLoading, setIsLoading] = useState(true);
  const [editingMvp, setEditingMvp] = useState<IMvp>();
  const [activeMvps, setActiveMvps] = useState<IMvp[]>([]);
  const [allMvps, setAllMvps] = useState<IMvp[]>([]);
  // Track if we are the ones writing to avoid echo loops
  // Must be a ref (not state) so the Firebase callback reads the current value
  const isSavingRef = useRef(false);

  // Subscribe to Firebase real-time updates
  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = subscribeToActiveMvps(server, async (rawMvps) => {
      if (isSavingRef.current) return; // Skip echo from our own writes

      try {
        const originalServerData = await getServerData(server);

        const finalData = rawMvps
          .map((mvp: any) => {
            // First try to find by ID (exact match)
            let found = originalServerData.find(
              (m) => String(m.id) === String(mvp.id)
            );
            // Only fall back to mapname if no ID match found
            if (!found) {
              found = originalServerData.find(
                (m) => m.spawn && m.spawn.some((s: any) => s.mapname === mvp.deathMap)
              );
            }
            if (!found) return null;
            return {
              ...found,
              deathMap: mvp.deathMap,
              deathPosition: mvp.deathPosition,
              deathTime: mvp.deathTime ? dayjs(mvp.deathTime).toDate() : null,
            };
          })
          .filter((mvp): mvp is NonNullable<typeof mvp> => mvp !== null && Array.isArray((mvp as any).spawn)) as IMvp[];

        setActiveMvps(finalData);
      } catch (error) {
        console.error('Error processing Firebase mvp data', error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [server]);

  const resetMvpTimer = useCallback((mvp: IMvp) => {
    const updatedMvp = { ...mvp, deathTime: new Date() };
    setActiveMvps((state) =>
      state.map((m) =>
        String(m.id) === String(mvp.id) && m.deathMap === mvp.deathMap
          ? updatedMvp
          : m
      )
    );
  }, []);

  const removeMvpByMap = useCallback(
    (mvpID: number | string, deathMap: string) => {
      // Remove from Firebase immediately
      removeMvpFromFirebase(mvpID, deathMap, server);
      // Optimistic local update
      setActiveMvps((state) =>
        state.filter(
          (m) => !(String(m.id) === String(mvpID) && m.deathMap === deathMap)
        )
      );
    },
    [server]
  );

  const killMvp = useCallback((mvp: IMvp, deathTime = new Date()) => {
    const killedMvp = { ...mvp, deathTime };
    setActiveMvps((s) => {
      const filtered = s.filter(
        (m) => !(String(m.id) === String(mvp.id) && m.deathMap === mvp.deathMap)
      );
      return [...filtered, killedMvp].sort((a: IMvp, b: IMvp) => {
        const bothHaveDeathTime = a.deathTime && b.deathTime;
        if (!bothHaveDeathTime) return 0;
        return dayjs(a.deathTime)
          .add(getMvpRespawnTime(a), 'ms')
          .diff(dayjs(b.deathTime).add(getMvpRespawnTime(b), 'ms'));
      });
    });
  }, []);

  const closeEditMvpModal = useCallback(() => setEditingMvp(undefined), []);

  const updateMvpPosition = useCallback(
    (mvpId: number, deathMap: string, position: IMapMark) => {
      setActiveMvps((state) =>
        state.map((m) =>
          String(m.id) === String(mvpId) && m.deathMap === deathMap
            ? { ...m, deathPosition: position }
            : m
        )
      );
    },
    []
  );

  // Auto-remove expired MVPs
  useEffect(() => {
    if (isLoading || activeMvps.length === 0) return;

    const checkExpiration = () => {
      const now = dayjs();
      setActiveMvps((prevActive) =>
        prevActive.filter((mvp) => {
          const respawnTimeMs = getMvpRespawnTime(mvp);
          if (!respawnTimeMs || !mvp.deathTime) return true;
          const autoRemoveTime = dayjs(mvp.deathTime).add(
            respawnTimeMs + 30 * 60 * 1000,
            'ms'
          );
          return now.isBefore(autoRemoveTime);
        })
      );
    };

    checkExpiration();
    const interval = setInterval(checkExpiration, 10000);
    return () => clearInterval(interval);
  }, [isLoading, activeMvps.length]);

  // Sync activeMvps changes to Firebase
  useEffect(() => {
    if (isLoading) return;

    const sync = async () => {
      isSavingRef.current = true;
      await saveActiveMvpsToFirebase(activeMvps, server);
      // Small delay so the Firebase listener doesn't echo back
      setTimeout(() => { isSavingRef.current = false; }, 1500);
    };

    sync();
  }, [isLoading, activeMvps, server]);

  // Update allMvps (available MVPs to kill)
  useEffect(() => {
    if (isLoading) return;

    async function filterAllMvps() {
      const originalServerData = await getServerData(server);
      const activeSpawns = activeMvps.map((m) => m.deathMap);
      const activeIds = activeMvps.map((m) => String(m.id));

      const filteredAllMvps = originalServerData
        .map((mvp) => {
          const isActive = activeIds.includes(String(mvp.id));
          if (!isActive) return mvp;
          return {
            ...mvp,
            spawn: mvp.spawn.filter(
              (spawn) => !activeSpawns.includes(spawn.mapname)
            ),
          };
        })
        .filter((mvp) => mvp.spawn.length > 0);

      setAllMvps(filteredAllMvps);
    }

    filterAllMvps();
  }, [isLoading, activeMvps, server]);

  return (
    <MvpsContext.Provider
      value={{
        activeMvps,
        allMvps,
        editingMvp,
        resetMvpTimer,
        killMvp,
        removeMvpByMap,
        setEditingMvp,
        closeEditMvpModal,
        updateMvpPosition,
        isLoading,
      }}
    >
      {children}
    </MvpsContext.Provider>
  );
}

export function useMvpsContext() {
  const context = useContext(MvpsContext);
  if (!context) {
    throw new Error('useMvpsContext must be used within a MvpProvider');
  }
  return context;
}
