import React from 'react';
import { Modal, Button, Input } from 'react-bootstrap';
const { Title, Header, Body } = Modal;

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    this._handleCreate = this._handleCreate.bind(this);
  }

  _handleCreate() {
    const { onCreate, onHide } = this.props;
    const { title } = this.refs;

    onCreate({
      title: title.getValue(),
    });

    setTimeout(onHide, 100);
  }
  render() {
    const { show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Header>
          <Title>
            Create Story
          </Title>
        </Header>
        <Body>
          <form>
            <Input ref='title' type='text' label='Title' placeholder='New story...'/>
          </form>
          <Button onClick={this._handleCreate}>Create!</Button>
        </Body>
      </Modal>
    );
  }
}
