import type { Dayjs } from 'dayjs';

import Question from '../assets/question.gif';

function remapGlobImport(data) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const newKey = key.split('/').slice(-1)[0].split('.')[0];
    acc[newKey] = value;
    return acc;
  }, {});
}

const MVP_SPRITES = import.meta.glob('../assets/mvp_icons/*', {
  import: 'default',
  eager: true,
});

const ANIMATED_MVP_SPRITES = import.meta.glob(
  '../assets/mvp_icons_animated/*',
  {
    import: 'default',
    eager: true,
  }
);

const MAP_IMAGES = import.meta.glob('../assets/mvp_maps/*', {
  import: 'default',
  eager: true,
});

const BIO3_SPRITES = import.meta.glob('../assets/bio3_sprites/*', {
  import: 'default',
  eager: true,
});

const mvpSprites = remapGlobImport(MVP_SPRITES);
const animatedMvpSprites = remapGlobImport(ANIMATED_MVP_SPRITES);
const mapImages = remapGlobImport(MAP_IMAGES);
export const bio3Sprites = Object.values(BIO3_SPRITES) as string[];

const SERVERS_DATA = import.meta.glob('../data/*.json', {
  import: 'default',
});

type IServers = {
  [key: string]: () => Promise<IMvp[]>;
};

export const SERVERS: IServers = Object.entries(SERVERS_DATA).reduce(
  (acc, [key, value]) => {
    const newKey = key.split('/')[2].split('.')[0];
    acc[newKey] = value;
    return acc;
  },
  {}
);

export async function getServerData(server: string) {
  try {
    const mvpsData = await SERVERS[server || 'iRO']();
    return mvpsData;
  } catch (error) {
    return await SERVERS['iRO']();
  }
}

/**
 * Convert Dayjs object to string with 'HH:mm:ss' format
 * @param time Dayjs object
 * @returns string with this format 'HH:mm:ss' ex: '16:10:20'
 */
export const respawnIn = (time: Dayjs) => time.format('HH:mm:ss');

/**
 * Convert Dayjs object to string with the interval that MVP can respawn
 * @param time Dayjs object
 * @returns string with this format 'HH:mm ~ HH:mm' ex: '16:00 ~ 16:10'
 */
export const respawnAt = (time: Dayjs, cooldownMs?: number) =>
  `${time.format('HH:mm')} ~ ${time
    .add(cooldownMs ?? 10 * 60 * 1000, 'ms')
    .format('HH:mm')}`;

/**
 * Returns the MVP sprite or map image or question emoticon if not found
 * @param id mvp id or map name
 * @returns image url
 */
export const getMvpSprite = (id: number | string): string =>
  (id === 'bio3' || id === 16581) && bio3Sprites.length > 0
    ? bio3Sprites[0]
    : mvpSprites[id] || mapImages[String(id)] || Question;

/**
 * Returns the animated MVP sprite or default sprite or question emoticon
 * @param id mvp id or map name
 * @returns image url
 */
export const getAnimatedMvpSprite = (id: number | string): string =>
  animatedMvpSprites[id] || getMvpSprite(id);

/**
 * Returns the map image or question emoticon
 * @param mapname name of the map
 * @returns image url
 */
export const getMapImg = (mapname: string): string =>
  mapImages[mapname] || Question;

/**
 * Returns the death map respawn time in milliseconds.
 * @param mvp Mvp object
 * @returns respawn time in milliseconds
 */
export function getMvpRespawnTime(mvp: IMvp): number | undefined {
  if (!mvp || !mvp.spawn) return undefined;
  const deathMap = mvp.spawn.find((spawn) => spawn.mapname === mvp.deathMap);
  const respawnTime = deathMap?.respawnTime;
  return respawnTime;
}

/**
 * Returns the death map cooldown time in milliseconds.
 * @param mvp Mvp object
 * @returns cooldown time in milliseconds
 */
export function getMvpCooldownTime(mvp: IMvp): number | undefined {
  if (!mvp || !mvp.spawn) return undefined;
  const deathMap = mvp.spawn.find((spawn) => spawn.mapname === mvp.deathMap);
  return deathMap?.cooldown;
}

/**
 * Clear the local storage
 */
export function clearData() {
  localStorage.clear();
}
