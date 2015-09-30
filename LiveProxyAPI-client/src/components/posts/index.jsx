import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import mapDispatchToProps from '../../mapDispatchToProps';

import CreateModal from './create';
import post from '../../definitions/post';
import Post from './post';

export class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
    };

    this._toggleModal = this._toggleModal.bind(this);
    this._handleCreate = this._handleCreate.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
  }

  _handleCreate(doc) {
    const { add } = this.props;
    console.log(doc);
    add({
      def: post,
      doc,
    });
  }

  _handleDelete(id) {
    const { destroy } = this.props;

    destroy({
      def: post,
      id,
    });
  }

  _toggleModal(creating) {
    this.setState({creating});
  }

  render() {
    const { posts={}, comments=[] } = this.props;
    return (
      <div>
        <PageHeader>Posts</PageHeader>

        {Object.keys(posts).map(key => {
          const obj = posts[key];
          return (
            <Post
              onDelete={this._handleDelete}
              comments={comments.filter(comment => {
                return comment.post_id === obj.id;
              })}
              data={obj}
            />
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
    comments: state.getIn(['collections', 'comments'], Map()).toArray().toJS(),
  };
}

export const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
