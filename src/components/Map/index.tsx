import { useState, useEffect, useCallback } from 'react';

import { getMapImg } from '@/utils';
import { MapMark } from '../MapMark';

import { MapImg } from './styles';

interface MapProps {
  mapName: string;
  onChange?: (x: IMapMark) => void;
  coordinates?: IMapMark;
}

const defaultCoordinates: IMapMark = {
  x: -1,
  y: -1,
};

export function Map({
  mapName,
  onChange,
  coordinates = defaultCoordinates,
}: MapProps) {
  const [markCoordinates, setMarkCoordinates] = useState<IMapMark>(coordinates);

  const mapMark = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!onChange) return;

      const { offsetX, offsetY } = e.nativeEvent;
      const newCoords = {
        x: offsetX,
        y: offsetY,
      };
      setMarkCoordinates(newCoords);
      onChange(newCoords);
    },
    [onChange]
  );

  const mapMarkTouch = useCallback(
    (e: React.TouchEvent<HTMLImageElement>) => {
      if (!onChange) return;
      e.preventDefault();

      const touch = e.changedTouches[0];
      const rect = (e.currentTarget as HTMLImageElement).getBoundingClientRect();
      const newCoords = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      setMarkCoordinates(newCoords);
      onChange(newCoords);
    },
    [onChange]
  );

  useEffect(() => {
    if (!onChange) return;
    setMarkCoordinates(defaultCoordinates);
  }, [mapName]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <MapImg
        src={getMapImg(mapName)}
        alt={mapName}
        onClick={mapMark}
        onTouchEnd={mapMarkTouch}
        clickable={!!onChange}
        loading='lazy'
      />
      {(markCoordinates.x !== -1 || markCoordinates.y !== -1) && (
        <MapMark x={markCoordinates.x} y={markCoordinates.y} />
      )}
    </div>
  );
}
