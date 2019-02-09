import { connect } from 'react-redux';
import {StationSelection} from './StationSelection';
import {fetchRealTimeEstimates} from '../../../actions/index';
import {getStationArray} from '../../../selectors/';

const mapStateToProps = state => {
	const stations = getStationArray(state);
  return { stations }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelect: abbr => dispatch( fetchRealTimeEstimates(abbr) )
  }
}

const StationSelectionContainer = connect(mapStateToProps,mapDispatchToProps)(StationSelection);

export default StationSelectionContainer;