import { styled } from '@linaria/react';

export const Modal = styled.div`
  width: 100%;
  max-width: 400px;

  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;
  padding: 2rem 0;
  border-radius: 6px;
  margin: 0 1rem;

  background-color: var(--modal_bg);
`;

export const Name = styled.span`
  color: var(---modal_text);
  font-weight: bold;
  font-size: 1.8rem;
`;

export const Warning = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 3rem;

  color: var(---modal_text);
  font-weight: bold;
  font-size: 1.4rem;
`;

export const TombToggleButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 18px;
  border-radius: 8px;
  border: 2px solid ${({ active }) => (active ? '#ffa800' : 'rgba(255,255,255,0.15)')};
  background: ${({ active }) =>
    active
      ? 'linear-gradient(135deg, #ffa800 0%, #c47300 100%)'
      : 'rgba(255,255,255,0.07)'};
  color: ${({ active }) => (active ? '#fff' : 'var(--modal_text)')};
  font-weight: 700;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ffa800;
    background: ${({ active }) =>
      active
        ? 'linear-gradient(135deg, #ffba00 0%, #d47f00 100%)'
        : 'rgba(255, 168, 0, 0.12)'};
    transform: translateY(-1px);
  }

  img {
    filter: ${({ active }) => (active ? 'brightness(1.3)' : 'none')};
  }
`;
