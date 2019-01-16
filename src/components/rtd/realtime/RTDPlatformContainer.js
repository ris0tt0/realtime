import { connect } from 'react-redux';
import Platform from './RTDPlatform';
import {getRealTimeByPlatform} from '../../../utils/';

const mapStateToProps = state => {
  return {
		platforms:getRealTimeByPlatform(state.realTimeDepartures),
  }
}

const NameContainer = connect(mapStateToProps)(Platform);


export default NameContainer;