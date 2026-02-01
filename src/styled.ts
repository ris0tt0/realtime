import { styled } from '@mui/material';

export const UnorderedListContainer = styled('ul')(
  ({ theme }) => `
  padding-left: 20px;
`,
);

export const ListItemContainer = styled('li')(
  ({ color }) => `
  ::marker {
    color: ${color};
  }
`,
);

export const BackgroundPaperContainer = styled('div')(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  background: ${theme.palette.background.paper};
`,
);
