import { connect } from 'react-redux';
import {StationSelection} from './StationSelection';
import {fetchRealTimeEstimates} from '../../../actions/index';
import {getStationArray} from '../../../selectors/';
import Logger from 'js-logger';

const mapStateToProps = state => {
  const stations = getStationArray(state);
  return { stations }
}

const mapDispatchToProps = dispatch => {
  const onSelect = abbr => dispatch( fetchRealTimeEstimates(abbr) )
  return { onSelect }
}

const StationSelectionContainer = connect(mapStateToProps,mapDispatchToProps)(StationSelection);

export default StationSelectionContainer;