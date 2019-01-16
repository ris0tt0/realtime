import { connect } from 'react-redux';
import RealTimeDepartures from './RTD';
import{showSortSelection} from '../../../actions/';

const mapStateToProps = state => {
	const {realTimeDepartures} = state;

  return {
		time:realTimeDepartures.time,
		stationName:realTimeDepartures.name ? realTimeDepartures.name : '',
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: id => dispatch( showSortSelection(id) )
  }
}

const RealTimeDeparturesContainer = connect(mapStateToProps,mapDispatchToProps)(RealTimeDepartures);


export default RealTimeDeparturesContainer;