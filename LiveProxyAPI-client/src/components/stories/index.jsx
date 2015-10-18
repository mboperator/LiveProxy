import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import mapDispatchToProps from '../../mapDispatchToProps';

import CreateModal from './create';
import story from '../../definitions/story';
import Story from './story';

export class Stories extends React.Component {
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
      def: story,
      doc,
    });
  }

  _handleDelete(id) {
    const { destroy } = this.props;

    destroy({
      def: story,
      id,
    });
  }

  _toggleModal(creating) {
    this.setState({creating});
  }

  render() {
    const { stories={}, sentences=[] } = this.props;
    return (
      <div>
        <PageHeader>Stories</PageHeader>

        {Object.keys(stories).map(key => {
          const obj = stories[key];
          return (
            <Storie
              onDelete={this._handleDelete}
              sentences={sentences.filter(sentence => {
                return sentence.story_id == obj.id;
              })}
              data={obj}
            />
            );
        })}

        <Button
          onClick={this._toggleModal.bind(null, true)}>
            + New Storie
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
    stories: state.getIn(['collections', 'stories'], Map()).toJS(),
    sentences: state.getIn(['collections', 'sentences'], Map()).toList().toJS(),
  };
}

export const StoriesContaine = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stories);
