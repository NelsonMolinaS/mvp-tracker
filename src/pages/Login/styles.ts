import { styled } from '@linaria/react';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at 50% 20%, #1e1e24 0%, #121215 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(248, 146, 0, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(30, 30, 36, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 4rem 3.2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const LogoWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(248, 146, 0, 0.25), 0 0 0 1px rgba(248, 146, 0, 0.3);
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.8rem;
  letter-spacing: -0.5px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #a0a0ab;
  margin-bottom: 3rem;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 600;
  color: #d1d1d6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconLeft = styled.div`
  position: absolute;
  left: 1.4rem;
  color: #71717a;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const IconRight = styled.button`
  position: absolute;
  right: 1.4rem;
  color: #71717a;
  background: transparent;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #f89200;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  background: rgba(18, 18, 21, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 0 4.2rem;
  color: #ffffff;
  font-size: 1.5rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: #f89200;
    background: rgba(18, 18, 21, 0.85);
    box-shadow: 0 0 0 3px rgba(248, 146, 0, 0.2);
  }

  &::placeholder {
    color: #52525b;
  }
`;

export const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(209, 0, 0, 0.12);
  border: 1px solid rgba(209, 0, 0, 0.4);
  border-radius: 10px;
  padding: 1.2rem 1.4rem;
  color: #ff6b6b;
  font-size: 1.35rem;
  font-weight: 500;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 5rem;
  background: linear-gradient(135deg, #f89200 0%, #e07b00 100%);
  color: #ffffff;
  border-radius: 10px;
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 6px 20px rgba(248, 146, 0, 0.3);

  &:hover {
    background: linear-gradient(135deg, #ffa31a 0%, #f89200 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(248, 146, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(248, 146, 0, 0.25);
  }
`;
