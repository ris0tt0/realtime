import { styled } from '@mui/material';

export const ETAStlyled = styled('div')`
  display: flex;
`;

export const ESTStyled = styled('div')<{ bartColor: string }>((props) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: props.bartColor,
  };
});
