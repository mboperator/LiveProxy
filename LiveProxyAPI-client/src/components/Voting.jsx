import React from 'react/addons';
import { connect } from 'react-redux';

import Vote from './Vote';
import Winner from './Winner';
import * as actionCreators from '../action_creators';

const {PureRenderMixin} = React.addons;

export class Voting extends React.Component {
  constructor() {
    super();
    // Mixin simulation
    Object.keys(PureRenderMixin).map(key => {
      this[key] = PureRenderMixin[key].bind(this);
    });
  }

  render() {
    const { winner } = this.props;
    return (
      <div className='voting'>
        {winner ?
          <Winner ref='winner' winner={winner}/> :
          <Vote {...this.props}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner'),
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
