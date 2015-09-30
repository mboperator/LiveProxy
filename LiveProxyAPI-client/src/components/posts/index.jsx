import React from 'react';
import { Panel, Button, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import mapDispatchToProps from '../../mapDispatchToProps';

import CreateModal from './create';
import post from '../../definitions/post';

export class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
    };

    this._toggleModal = this._toggleModal.bind(this);
    this._handleCreate = this._handleCreate.bind(this);
  }

  _handleCreate(doc) {
    const { add } = this.props;
    console.log(doc);
    add({
      def: post,
      doc,
    });
  }

  _toggleModal(creating) {
    this.setState({creating});
  }

  render() {
    const { posts={} } = this.props;
    return (
      <div>
        <PageHeader>Posts</PageHeader>
        {Object.keys(posts).map(key => {
          return (
            <Panel header={posts[key].title}>
              <p>{posts[key].body}</p>
            </Panel>
          );
        })}

        <Button
          onClick={this._toggleModal.bind(null, true)}>
            + New Post
        </Button>

        <CreateModal
          show={this.state.creating}
          onHide={this._toggleModal.bind(null, false)}
          onCreate={this._handleCreate}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    posts: state.getIn(['collections', 'posts'], Map()).toJS(),
  };
}

export const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
