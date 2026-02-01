import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const LinesRteContainer = styled('div')`
  margin: 0px 0.5rem;
`;

export const LoadingStyled = styled('div')`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const LinkStyled = styled(Link)(
  ({ theme }) => `
    color: inherit;
    :hover {
      text-decoration: none;
      color: ${theme.palette.text.secondary};
    }
  `,
);

export const RoutesLinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
  border-radius: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    background-color: #e0e0e0;
  }
  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;

export const RoutesContainerListStyled = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: scroll;
  height: 100%;
`;

export const RoutesContainerStyled = styled('main')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
