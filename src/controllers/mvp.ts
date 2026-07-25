import dayjs from 'dayjs';

import { LOCAL_STORAGE_ACTIVE_MVPS_KEY } from '@/constants';
import { getServerData } from '@/utils';

export async function loadMvpsFromLocalStorage(
  server: string
): Promise<IMvp[]> {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_ACTIVE_MVPS_KEY);
    if (!data) return [];

    const dataParse = JSON.parse(data);
    if (!dataParse) return [];

    const savedServerData = dataParse[server];

    const hasSavedServerData = !!savedServerData;
    if (!hasSavedServerData) return [];

    const originalServerData = await getServerData(server);

    const finalData = savedServerData
      .map((mvp: IMvp) => {
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
      .filter((mvp): mvp is IMvp => mvp !== null && Array.isArray(mvp.spawn));

    return finalData;
  } catch (error) {
    console.error('Failed to load mvps from local storage', error);
    return [];
  }
}

export function saveActiveMvpsToLocalStorage(
  activeMvps: IMvp[],
  server: string
) {
  const data = activeMvps?.map((mvp) => ({
    id: mvp.id,
    deathMap: mvp.deathMap,
    deathTime: mvp.deathTime,
    deathPosition: mvp.deathPosition,
  }));

  const currentLocalMvps = localStorage.getItem(LOCAL_STORAGE_ACTIVE_MVPS_KEY);

  const currentData = currentLocalMvps ? JSON.parse(currentLocalMvps) : {};

  const updatedActiveData = {
    ...currentData,
    [server]: data,
  };

  Object.keys(updatedActiveData).forEach(
    (key) => !isNaN(Number(key)) && delete updatedActiveData[key]
  );

  localStorage.setItem(
    LOCAL_STORAGE_ACTIVE_MVPS_KEY,
    JSON.stringify(updatedActiveData)
  );
}
