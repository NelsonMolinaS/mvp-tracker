import { useState, useEffect } from 'react';
import { getMvpSprite, getAnimatedMvpSprite, bio3Sprites } from '@/utils';
import { Sprite } from './styles';

type MvpSpriteProps = {
  id: number | string;
  name: string;
  animated?: boolean;
};

export function MvpSprite({ id, name, animated }: MvpSpriteProps) {
  const isBio3 = id === 'bio3' || id === 16581 || name === 'Bio 3';
  const [bio3Index, setBio3Index] = useState(0);

  useEffect(() => {
    if (!isBio3 || bio3Sprites.length === 0) return;
    const interval = setInterval(() => {
      setBio3Index((prev) => (prev + 1) % bio3Sprites.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isBio3]);

  const spriteSrc =
    isBio3 && bio3Sprites.length > 0
      ? bio3Sprites[bio3Index]
      : animated
      ? getAnimatedMvpSprite(id)
      : getMvpSprite(id);

  return (
    <Sprite
      src={spriteSrc}
      alt={name}
      isAnimated={animated}
      loading='lazy'
    />
  );
}
