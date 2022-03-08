import { createSelector } from 'reselect';

const bsaResultSelector = (state) => state.jbart.bsa.result;
const bsaEntitiesSelector = (state) => state.jbart.bsa.entities;

export const getBsaListSelector = createSelector(
  [bsaResultSelector, bsaEntitiesSelector],
  (results, entities) => {
    const bsa = results?.bsa.map((id) => entities?.bsa[id]);
    return { ...results, bsa };
  }
);
