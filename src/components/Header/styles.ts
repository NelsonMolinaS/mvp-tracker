import { styled } from '@linaria/react';

export const Container = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;

  height: 75px;
  padding: 0 30px;

  background: rgba(22, 22, 28, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  grid-area: 1 / 1 / 2 / 2;
`;

export const Logo = styled.img`
  width: 48px;
  height: auto;
  filter: drop-shadow(0 0 8px rgba(248, 146, 0, 0.4));
`;

export const Title = styled.h1`
  margin-left: 15px;

  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.5px;

  white-space: nowrap;

  background: linear-gradient(135deg, #ffffff 0%, #ffa800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 768px) and (max-width: 935px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Customization = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 1.6rem;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(209, 0, 0, 0.2);
  border: 1px solid rgba(209, 0, 0, 0.4);
  color: #ff6b6b;
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(209, 0, 0, 0.85);
    border-color: rgba(209, 0, 0, 0.85);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(209, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FloatingMascot = styled.img`
  position: fixed;
  left: 18px;
  top: 85px;
  width: 150px;
  height: auto;
  z-index: 99;
  pointer-events: none;
  filter: drop-shadow(0 0 18px rgba(248, 146, 0, 0.3));
  -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%);
  mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%);
  animation: mascotFloat 3s ease-in-out infinite;

  @keyframes mascotFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  @media (max-width: 1024px) {
    width: 110px;
    left: 10px;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

