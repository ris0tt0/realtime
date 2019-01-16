import { connect } from 'react-redux';
import {RealTimeDepartures} from './RealTimeDepartures';

const mapStateToProps = state => {
  return {
		sortSelection:state.sortSelection,
  }
}

const RealTimeDeparturesContainer = connect(mapStateToProps)(RealTimeDepartures);

export default RealTimeDeparturesContainer;