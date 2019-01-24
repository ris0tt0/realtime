import { connect } from 'react-redux';
import Name from './RTDName';

import {getRealTimeStationArray} from '../../../selectors/';

const mapStateToProps = state => {
  return {
		names:getRealTimeStationArray(state)
  }
}

const NameContainer = connect(mapStateToProps)(Name);


export default NameContainer;