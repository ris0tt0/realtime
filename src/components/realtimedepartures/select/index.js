import { connect } from 'react-redux';
import { fetchRealTimeEstimates } from '../../../actions/index';
import { getStationArray } from '../../../selectors/';
import { StationSelection } from './StationSelection';

const mapStateToProps = (state) => {
  const stations = getStationArray(state);
  return { stations };
};

const mapDispatchToProps = (dispatch) => {
  const onSelect = (abbr) => dispatch(fetchRealTimeEstimates(abbr));
  return { onSelect };
};

const StationSelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StationSelection);

export default StationSelectionContainer;
