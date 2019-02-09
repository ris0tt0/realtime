import { connect } from 'react-redux';
import {Information} from './Information'
import {getTrainCountNumber} from '../../../selectors/';

const mapStateToProps = state => {
  return {
		numberOfTrains:getTrainCountNumber(state)
  }
}

const HeaderContainer = connect(mapStateToProps)(Information);

export default HeaderContainer;