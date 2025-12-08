import React, { FC } from 'react';
import { BartRoute } from '../../../db';
import { ListItemContainer, UnorderedListContainer } from '../../../styled';
import { LinkStyled } from '../../styled';
import { Box } from '@mui/material';

export const Lines: FC<{ title: string; line: BartRoute[] | null }> = ({
  title,
  line = null,
}) => {
  if (!line || line.length < 1) {
    return null;
  }
  return (
    <>
      <Box component="h4" sx={{ margin: '0' }}>
        {title}
      </Box>
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
    </>
  );
};
