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
