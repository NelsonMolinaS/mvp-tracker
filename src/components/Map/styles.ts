import { styled } from '@linaria/react';

interface MapImgProps {
  clickable: boolean;
}

export const MapImg = styled.img<MapImgProps>`
  width: min(25rem, calc(100vw - 5rem));
  height: min(25rem, calc(100vw - 5rem));
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
`;
