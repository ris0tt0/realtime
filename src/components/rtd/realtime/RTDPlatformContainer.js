import { connect } from 'react-redux';
import Platform from './RTDPlatform';
import {getRealTimeStationPlatformMap} from '../../../selectors/';

const mapStateToProps = state => {
  return {
		platforms:getRealTimeStationPlatformMap(state),
  }
}

const NameContainer = connect(mapStateToProps)(Platform);


export default NameContainer;