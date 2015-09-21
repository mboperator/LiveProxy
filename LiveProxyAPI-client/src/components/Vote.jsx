import React from 'react/addons';

const {PureRenderMixin} = React.addons;

export default class Vote extends React.Component {

  constructor() {
    super();
    Object.keys(PureRenderMixin).map(key => {
      this[key] = PureRenderMixin[key].bind(this);
    });
  }

  getPair() {
    return this.props.pair || [];
  }

  isDisabled() {
    return !!this.props.hasVoted;
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }

  render() {
    return (
      <div className='voting'>
        {this.getPair().map(entry => {
          return (
            <button
              disabled={this.isDisabled()}
              onClick={() => {this.props.vote(entry)}}
              key={entry}>
              <h1>{entry}</h1>
              {this.hasVotedFor(entry) ?
                <div className='label'>Voted</div>
                : null
              }
            </button>
          );
        })}
      </div>
    );
  }
}
