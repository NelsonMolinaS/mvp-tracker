import { styled } from '@linaria/react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 220px;
  padding: 14px 12px;

  border-radius: 14px;

  background: var(--mvpCard_bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(248, 146, 0, 0.45);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(248, 146, 0, 0.2);
  }
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ID = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--mvpCard_id);
  letter-spacing: 0.5px;
`;

export const Name = styled.span`
  font-weight: 700;
  font-size: 17px;
  color: var(--mvpCard_name);
  text-align: center;
`;

export const MapName = styled.span`
  text-align: center;
  white-space: pre-wrap;
  margin-top: 5px;
  color: var(--mvpCard_text);
  font-size: 13px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 14px;

  border: 0;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const KilledNow = styled(Button)`
  background: var(--mvpCard_killButton);
`;

export const EditButton = styled(Button)`
  background: var(--mvpCard_editButton);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const TombIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
`;

export const Controls = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ isActive }) => (isActive ? 'column' : 'row')};

  margin-top: ${({ isActive }) => (isActive ? 35 : 8)}px;
  gap: 10px;
`;

export const Control = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;
  border-radius: 10px;

  font-weight: bolder;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    stroke-width: 2.5px;
    width: 17px;
    height: 17px;
    color: #fff;
    transition: transform 0.2s ease;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover svg {
    transform: scale(1.15);
  }

  /* Show Map - blue */
  &:first-child {
    background: linear-gradient(135deg, #00b4ff 0%, #0077cc 100%);
    box-shadow: 0 3px 10px rgba(0, 168, 255, 0.3);

    &:hover {
      box-shadow: 0 4px 18px rgba(0, 168, 255, 0.55), 0 0 10px rgba(0, 168, 255, 0.3);
      transform: translateY(-2px);
    }
  }

  /* Reset Timer - amber */
  &:nth-child(2) {
    background: linear-gradient(135deg, #ffa800 0%, #c47300 100%);
    box-shadow: 0 3px 10px rgba(248, 146, 0, 0.3);

    &:hover {
      box-shadow: 0 4px 18px rgba(248, 146, 0, 0.55), 0 0 10px rgba(248, 146, 0, 0.3);
      transform: translateY(-2px);
    }
  }

  /* Remove MVP - red */
  &:nth-child(3) {
    background: linear-gradient(135deg, #ff4d4d 0%, #a80000 100%);
    box-shadow: 0 3px 10px rgba(209, 0, 0, 0.3);

    &:hover {
      box-shadow: 0 4px 18px rgba(209, 0, 0, 0.55), 0 0 10px rgba(209, 0, 0, 0.3);
      transform: translateY(-2px);
    }
  }

  &:active {
    transform: translateY(0) !important;
  }
`;

