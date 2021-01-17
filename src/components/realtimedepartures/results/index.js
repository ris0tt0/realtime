import { connect } from 'react-redux';
import { showSortSelection } from '../../../actions/';
import {
  getRealTimeDeparturesStationName,
  getRealTimeDeparturesStationTime,
} from '../../../selectors';
import { Sort } from './Sort';

const mapStateToProps = (state) => {
  const time = getRealTimeDeparturesStationTime(state);
  const stationName = getRealTimeDeparturesStationName(state);

  return {
    time,
    stationName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => dispatch(showSortSelection(id)),
  };
};

const RealTimeDeparturesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sort);

export default RealTimeDeparturesContainer;
