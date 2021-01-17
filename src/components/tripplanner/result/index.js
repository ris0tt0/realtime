import { connect } from 'react-redux';
import { setTripPlannerDetails } from '../../../actions/';
import {
  getHasDestinationStartingAbbr,
  getTripPlannerTrips,
} from '../../../selectors/';
import { Result } from './Result';

const mapStateToProps = (state) => {
  const hasAllAbbr = getHasDestinationStartingAbbr(state);

  if (hasAllAbbr) {
    const trips = getTripPlannerTrips(state);
    // Logger.info(trips);
    return { trips };
  } else {
    return { trips: [] };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (tripId) => dispatch(setTripPlannerDetails(tripId)),
  };
};

const ResultContainer = connect(mapStateToProps, mapDispatchToProps)(Result);

export default ResultContainer;
