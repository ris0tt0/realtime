import { Paper, styled } from '@mui/material';
import React, { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootStyled = styled('div')`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  height: 100vh;
`;

const MenuStyled = styled(Paper)`
  display: flex;
  gap: 1rem;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const LinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;

  &.active {
    font-weight: bold;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const RouteMenu: FC = () => {
  return (
    <MenuStyled>
      <LinkStyled to="routes">routes</LinkStyled>
      <LinkStyled to="stations">stations</LinkStyled>
      <LinkStyled to="rte">real time estimates</LinkStyled>
      <LinkStyled to="about">about</LinkStyled>
    </MenuStyled>
  );
};

export const Root: FC = () => {
  return (
    <RootStyled>
      <RouteMenu />
      <Outlet />
    </RootStyled>
  );
};
