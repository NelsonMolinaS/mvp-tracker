import { styled } from '@linaria/react';

interface SpriteProps {
  isAnimated?: boolean;
}

export const Sprite = styled.img<SpriteProps>`
  width: auto;
  height: 70px;
  margin-top: 8px;

  border-top-left-radius: ${({ isAnimated }) => (isAnimated ? 0 : 25)}px;
`;
