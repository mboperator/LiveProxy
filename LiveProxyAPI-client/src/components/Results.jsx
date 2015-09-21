import React from 'react/addons';
import { connect } from 'react-redux';

import Winner from './Winner';
import * as actionCreators from '../action_creators';

const { PureRenderMixin } = React.addons;

export class Results extends React.Component {
  constructor() {
    super();
    Object.keys(PureRenderMixin).map(key => {
      this[key] = PureRenderMixin[key].bind(this);
    });
  }

  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  }

  render() {
    return this.props.winner ?
      <Winner ref='winner' winner={this.props.winner}/>:
      <div className='results'>
        {this.getPair().map(entry => {
          return (
            <div key={entry} className='entry'>
              <h1>{entry}</h1>
              <div className='voteCount'>
                {this.getVotes(entry)}
              </div>
            </div>
          );
        })}
        <div className='management'>
          <button
            ref='next'
            className='next'
            onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>;
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
  };
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators,
)(Results);
