import { connect } from 'react-redux';
import RealTimeDepartures from './RTD';
import{showSortSelection} from '../../../actions/';

const mapStateToProps = state => {
	const {rtd} = state;

  return {
		time:rtd.time,
		stationName:rtd.name ? rtd.name : '',
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: id => dispatch( showSortSelection(id) )
  }
}

const RealTimeDeparturesContainer = connect(mapStateToProps,mapDispatchToProps)(RealTimeDepartures);


export default RealTimeDeparturesContainer;