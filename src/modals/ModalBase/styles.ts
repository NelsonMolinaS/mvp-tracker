import { styled } from '@linaria/react';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  overflow-y: auto;
  padding: 2rem 0;

  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;
