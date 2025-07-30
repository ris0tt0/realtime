import React, { FC } from 'react';
import { LinkStyled } from './styled';

export const About: FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>About Jonathan Gee's Real Time BART Estimates App</p>
      <p>
        This application uses the Lagacy BART api{' '}
        <LinkStyled to="https://www.bart.gov/schedules/developers/api">
          barts
        </LinkStyled>
      </p>
    </div>
  );
};
