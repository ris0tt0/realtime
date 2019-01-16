import { connect } from 'react-redux';
import Name from './RTDName';

import {getRealTimeByName} from '../../../utils/'

const mapStateToProps = state => {
  return {
		names:getRealTimeByName(state.realTimeDepartures)
  }
}

const NameContainer = connect(mapStateToProps)(Name);


export default NameContainer;