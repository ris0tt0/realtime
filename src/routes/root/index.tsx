import { Container, styled } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useCommands } from '../../hooks/useCommands';
import { BackgroundPaperContainer } from '../../styled';

const MenuStyled = styled(BackgroundPaperContainer)`
  flex-direction: row;
  gap: 1rem;
  padding: 1rem 0.5rem;
`;

const LinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;

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

export const Advisories: FC = () => {
  const commands = useCommands();
  const [advisories, setAdvisories] = useState<string[]>([]);

  useEffect(() => {
    commands.updateAdvisories().then((result) => {
      setAdvisories(result);
    });
  }, []);

  return <div>service {advisories.length}</div>;
};

export const Root: FC = () => {
  return (
    <Container maxWidth="lg">
      <RouteMenu />
      <Outlet />
    </Container>
  );
};
