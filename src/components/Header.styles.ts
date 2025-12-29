// src/components/Header.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.disabled};
  background-color: ${theme.colors.background};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1%;
  color: ${theme.colors.primary};
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  margin: 0 auto;
`;

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${theme.colors.text};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const UserActions = styled.ul`
  display: flex;
  align-items: center;
  margin-right: 1%;
  padding: 0;

  li:not(:first-child) {
    margin-left: 1.5rem;
  }
`;
