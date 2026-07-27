import { styled } from '@linaria/react';

export const Link = styled.a`
  font-weight: 600;
  font-size: 14px;
  color: var(--header_text);
  text-decoration: none;
  letter-spacing: 0.3px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.75;
    text-decoration: underline;
  }
`;
