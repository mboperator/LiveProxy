import React from 'react';
import { Panel, Button } from 'react-bootstrap';

export default class Post extends React.Component {
  render() {
    const { data, onDelete } = this.props;
    return (
      <Panel header={data.title}>
        <p>{data.body}</p>
        <Button onClick={onDelete.bind(null, data.id)}>
          Delete
        </Button>
      </Panel>
    );
  }
}
