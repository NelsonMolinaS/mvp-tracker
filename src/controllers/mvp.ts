import dayjs from 'dayjs';
import { ref, set, get, onValue, remove, off } from 'firebase/database';

import { db } from '@/lib/firebase';
import { getServerData } from '@/utils';

function getMvpKey(mvp: { id: number | string; deathMap?: string }) {
  return `${mvp.id}_${(mvp.deathMap || '').replace(/[.#$[\]]/g, '_')}`;
}

export async function loadMvpsFromFirebase(server: string): Promise<IMvp[]> {
  try {
    const snapshot = await get(ref(db, `activeMvps/${server}`));
    if (!snapshot.exists()) return [];

    const data = snapshot.val();
    const originalServerData = await getServerData(server);

    const finalData = Object.values(data)
      .map((mvp: any) => {
        const found = originalServerData.find(
          (m) =>
            String(m.id) === String(mvp.id) ||
            (m.spawn && m.spawn.some((s) => s.mapname === mvp.deathMap))
        );
        if (!found) return null;
        return {
          ...found,
          deathMap: mvp.deathMap,
          deathPosition: mvp.deathPosition,
          deathTime: dayjs(mvp.deathTime).toDate(),
        };
      })
      .filter((mvp): mvp is NonNullable<typeof mvp> => mvp !== null && Array.isArray((mvp as any).spawn)) as IMvp[];

    return finalData;
  } catch (error) {
    console.error('Failed to load mvps from Firebase', error);
    return [];
  }
}

export async function saveActiveMvpsToFirebase(
  activeMvps: IMvp[],
  server: string
) {
  try {
    const serverRef = ref(db, `activeMvps/${server}`);

    if (activeMvps.length === 0) {
      await set(serverRef, null);
      return;
    }

    const data: Record<string, any> = {};
    activeMvps.forEach((mvp) => {
      const key = getMvpKey(mvp);
      data[key] = {
        id: mvp.id,
        deathMap: mvp.deathMap,
        deathTime: mvp.deathTime ? dayjs(mvp.deathTime).toISOString() : null,
        deathPosition: mvp.deathPosition || null,
      };
    });

    await set(serverRef, data);
  } catch (error) {
    console.error('Failed to save mvps to Firebase', error);
  }
}

export function subscribeToActiveMvps(
  server: string,
  callback: (mvps: any[]) => void
) {
  const serverRef = ref(db, `activeMvps/${server}`);

  onValue(serverRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }
    const data = snapshot.val();
    callback(Object.values(data));
  });

  // Returns unsubscribe function
  return () => off(serverRef);
}

export async function removeMvpFromFirebase(
  mvpID: number | string,
  deathMap: string,
  server: string
) {
  try {
    const key = getMvpKey({ id: mvpID, deathMap });
    await remove(ref(db, `activeMvps/${server}/${key}`));
  } catch (error) {
    console.error('Failed to remove mvp from Firebase', error);
  }
}
