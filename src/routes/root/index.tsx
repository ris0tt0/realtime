import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Box, Container, styled, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { TrainsInService } from '../../containers/rte/trainsInService';
import { elevatorStatus, serviceAdvisories } from '../../selectors';

export const MenuStyled = styled('nav')`
  display: flex;
  gap: 1rem;
`;

const AdvisoriesStyled = styled('div')(
  ({ theme }) => `
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px ${theme.palette.warning.dark} solid;
  background: ${theme.palette.warning.light};
  color: ${theme.palette.warning.contrastText};
`,
);

const MenuLinkStyled = styled(NavLink)(({ theme }) => {
  return {
    textDecoration: 'none',
    color: 'inherit',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
    '&.active': {
      fontWeight: 'bold',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  };
});

export const LinkStyled = styled(Link)`
  color: inherit;
`;

const RootContainer = styled(Container)(({ theme }) => {
  return {
    '#header-menu': {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        marginBottom: '1rem',
      },
      alignItems: 'baseline',
      [theme.breakpoints.up('md')]: {
        gap: '1.5rem',
      },
    },
    'h1, h2, h3, h4': {
      color: theme.palette.secondary.light,
    },
    header: {
      h1: {
        color: theme.palette.primary.contrastText,
        marginBottom: 0,
      },
      h2: {
        color: theme.palette.primary.contrastText,
        marginTop: 0,
      },

      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: 'sticky',
      alignItems: 'center',
      width: '100%',
      top: 0,
      zIndex: 10,
      gap: '1rem',
      padding: '0 .5rem',
    },
    footer: {
      display: 'flex',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem 0.5rem',
    },
  };
});

const RouteMenu: FC = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MenuStyled>
      <MenuLinkStyled to="routes">Routes</MenuLinkStyled>
      <MenuLinkStyled to="stations">Stations</MenuLinkStyled>
      <MenuLinkStyled to="rte">
        {sm ? 'RT Estimates' : 'Real Time Estimates'}
      </MenuLinkStyled>
      <MenuLinkStyled to="about">about</MenuLinkStyled>
    </MenuStyled>
  );
};

export const ElevatorStatus: FC = () => {
  const elevatorData = useSelector(elevatorStatus);

  const elevators = elevatorData.map((elevator, index) => {
    return <span key={index}>{elevator}</span>;
  });

  return <div>{elevators}</div>;
};

export const Advisories: FC = () => {
  const advisoryData = useSelector(serviceAdvisories);

  const advisories = advisoryData.map((advisory, index) => {
    return (
      <AdvisoriesStyled key={index}>
        <WarningAmberIcon />
        <Box sx={{ marginLeft: '1rem' }}>{advisory}</Box>
      </AdvisoriesStyled>
    );
  });

  return <div>{advisories}</div>;
};

export const Root: FC = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <RootContainer maxWidth="lg">
      <Advisories />
      <header>
        <div id="header-menu">
          {sm ? <h1>BART</h1> : <h1>Bay Area Rapid Transit</h1>}
          <RouteMenu />
        </div>
        <TrainsInService />
        <ElevatorStatus />
      </header>
      <Outlet />
      <footer>
        <MenuLinkStyled to="mailto:j@jonathangee.com">
          &copy; 2026 Jonathan Gee
        </MenuLinkStyled>
      </footer>
    </RootContainer>
  );
};
