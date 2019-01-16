import { connect } from 'react-redux';
import Header from './RTDHeader'
import {getTrainCountNumber} from '../../../selectors/';

const mapStateToProps = state => {
  return {
		numberOfTrains:getTrainCountNumber(state)
  }
}

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;