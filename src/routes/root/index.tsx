import { Container, styled } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useCommands } from '../../hooks/useCommands';

export const MenuStyled = styled('nav')(
  ({ theme }) => `
  display: flex;
  gap: 1rem;
`,
);

const MenuLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    font-weight: bold;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkStyled = styled(Link)`
  color: inherit;
`;

const RootContainer = styled(Container)(
  ({ theme }) => `
    header {
      background: ${theme.palette.background.paper};
      position: sticky;
      display: flex;
      align-items: center;
      width: 100%;
      top: 0;
      z-index: 10;
      gap: 1rem;
      padding: 0 .5rem;
    }

    footer {
      display: flex;
      background: ${theme.palette.background.paper};
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0.5rem;
  }
`,
);

const RouteMenu: FC = () => {
  return (
    <MenuStyled>
      <MenuLinkStyled to="routes">routes</MenuLinkStyled>
      <MenuLinkStyled to="stations">stations</MenuLinkStyled>
      <MenuLinkStyled to="rte">real time estimates</MenuLinkStyled>
      <MenuLinkStyled to="about">about</MenuLinkStyled>
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
    <RootContainer maxWidth="lg">
      <header>
        <h1>BART Legacy API</h1>
        <RouteMenu />
      </header>
      <Outlet />
      <footer>
        <MenuLinkStyled to="mailto:j@jonathangee.com">
          &copy; Jonathan Gee
        </MenuLinkStyled>
      </footer>
    </RootContainer>
  );
};
