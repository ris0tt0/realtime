import { connect } from 'react-redux';
import { Platform } from './Platform';
import { getRealTimeStationPlatformMap } from '../../../selectors';

const mapStateToProps = (state) => {
  return {
    platforms: getRealTimeStationPlatformMap(state),
  };
};

const NameContainer = connect(mapStateToProps)(Platform);

export default NameContainer;
