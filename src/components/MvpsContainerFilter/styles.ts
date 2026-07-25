import { styled } from '@linaria/react';
import { Search, ArrowUp, ArrowDown, XCircle } from '@styled-icons/feather';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  gap: 16px;

  @media (max-width: ${650 / 16}em) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 14px;
  gap: 8px;
  border-radius: 10px;
  background: var(--filterSearch_bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--filterSearch_border);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: var(--filterSearch_border_focus);
    box-shadow: 0 0 0 3px rgba(248, 146, 0, 0.25);
  }
`;

export const SearchInput = styled.input`
  color: var(--filterSearch_text);
  font-size: 14px;
  font-weight: 500;
  background: none;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const SearchIcon = styled(Search)`
  width: 20px;
  height: 20px;
  color: #ffa800;
  stroke-width: 2px;
`;

export const ClearButton = styled(XCircle)`
  width: 16px;
  height: 16px;
  stroke-width: 2px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ff4d4d;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 2px 6px;
  border-radius: 10px;
  background: var(--filterSearch_bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--filterSearch_border);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);

  @media (max-width: ${650 / 16}em) {
    width: 100%;
  }
`;

export const Reverse = styled.button`
  border-left: thin solid var(--filterSearch_text);
  margin: 5px 0;
  padding: 0 2px;
  background: none;
`;

export const UpArrow = styled(ArrowUp)`
  width: 24px;
  height: 24px;
  color: var(--filterSearch_text);
  stroke-width: 1.5px;
`;

export const DownArrow = styled(ArrowDown)`
  width: 24px;
  height: 24px;
  color: var(--filterSearch_text);
  stroke-width: 1.5px;
`;
