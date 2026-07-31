import { styled } from '@linaria/react';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-bottom: 40px;
  background: radial-gradient(circle at 50% 0%, #1c1c28 0%, #0f0f13 100%);
  min-height: 100vh;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
  width: 100%;
`;

export const SectionTitle = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ffa800;
  background: rgba(248, 146, 0, 0.1);
  border: 1px solid rgba(248, 146, 0, 0.3);
  padding: 0.6rem 2.2rem;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(248, 146, 0, 0.12);
  backdrop-filter: blur(8px);
`;

export const MvpsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1.5rem;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1350px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${1000 / 16}em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${650 / 16}em) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const StatusLegendBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;
  padding: 0.8rem 2rem;
  border-radius: 16px;
  background: rgba(26, 26, 33, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  margin-top: -2px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
    padding: 1rem 1.4rem;
  }
`;

export const StatusLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.02rem;
  color: var(--text);

  span {
    opacity: 0.95;
  }

  strong {
    font-weight: 700;
  }
`;

export const StatusDot = styled.span<{ type: 'normal' | 'respawning' | 'passed' }>`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  background-color: ${({ type }) =>
    type === 'respawning'
      ? 'var(--timers_respawning)'
      : type === 'passed'
      ? 'var(--timers_passed)'
      : 'var(--timers_normal)'};
  box-shadow: 0 0 8px
    ${({ type }) =>
      type === 'respawning'
        ? 'rgba(0, 230, 118, 0.6)'
        : type === 'passed'
        ? 'rgba(255, 77, 77, 0.6)'
        : 'rgba(255, 255, 255, 0.4)'};
`;


