import React from 'react/addons';

const {PureRenderMixin} = React.addons;

export default class Winner extends React.Component {

  constructor() {
    super();

    Object.keys(PureRenderMixin).map(key => {
      this[key] = PureRenderMixin[key].bind(this);
    });
  }

  render() {
    return (
      <div className='winner'>
        Winner is {this.props.winner}
      </div>
    );
  }
}
