import { styled } from '@mui/material';
import React, { FC } from 'react';
import { BartRoute } from '../../../db';
import { ListItemContainer, UnorderedListContainer } from '../../../styled';
import { LinesRteContainer, LinkStyled } from '../../styled';

const HeaderStyled = styled('h5')`
  margin: 0px;
`;

export const Lines: FC<{ title: string; line: BartRoute[] | null }> = ({
  title,
  line = null,
}) => {
  if (!line || line.length < 1) {
    return null;
  }
  return (
    <LinesRteContainer>
      <HeaderStyled>{title}</HeaderStyled>
      <UnorderedListContainer>
        {line.map((route) => {
          return (
            <ListItemContainer key={route.abbr} color={route.hexcolor}>
              <LinkStyled to={`/routes/${route.number}`}>
                {route.name}
              </LinkStyled>
            </ListItemContainer>
          );
        }) ?? null}
      </UnorderedListContainer>
    </LinesRteContainer>
  );
};
