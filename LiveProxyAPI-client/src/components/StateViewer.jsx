import React from 'react/addons';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';

const { PureRenderMixin } = React.addons;

export class StateViewer extends React.Component {
  constructor() {
    super();
    Object.keys(PureRenderMixin).map(key => {
      this[key] = PureRenderMixin[key].bind(this);
    });
  }
  render() {
    const { posts, users, comments } = this.props;
    return (
      <div>
        {JSON.stringify(posts)}
        {JSON.stringify(users)}
        {JSON.stringify(comments)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.getIn(['collections', 'posts']),
    users: state.getIn(['collections', 'users']),
    comments: state.getIn(['collections', 'comments']),
  };
}

export const StateViewerContainer = connect(
  mapStateToProps,
  actionCreators,
)(StateViewer);
