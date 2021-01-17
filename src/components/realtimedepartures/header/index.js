import { connect } from 'react-redux';
import { getTrainCountNumber } from '../../../selectors/';
import { Information } from './Information';

const mapStateToProps = (state) => {
  return {
    numberOfTrains: getTrainCountNumber(state),
  };
};

const HeaderContainer = connect(mapStateToProps)(Information);

export default HeaderContainer;
