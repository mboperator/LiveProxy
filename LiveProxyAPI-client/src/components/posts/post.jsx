import React from 'react';
import { Panel, Button, Row, Col } from 'react-bootstrap';

export default class Post extends React.Component {
  render() {
    const { data, onDelete, comments } = this.props;
    return (
      <Panel>
        <div style={{padding: '5px 15px'}}>
          <Row>
            <Col xs={11} md={11}>
              <h1>{data.title}</h1>
            </Col>
            <Col xs={1} md={1}>
              <div style={{paddingTop: '10px'}}>
                <Button bsStyle='danger' onClick={onDelete.bind(null, data.id)}>
                  Delete
                </Button>
              </div>
            </Col>
          </Row>

          <div style={{paddingTop: '15px'}}>
            <Row>
              <Col xs={6} md={12}>
                {data.body}
              </Col>

              <Col xs={6} md={4}>
                {comments.length ?
                    <div style={{paddingTop: '10px'}}>
                      <b>Comments</b>
                      <ul>
                        {comments.map(comment => {
                          return comment.body;
                        })}
                      </ul>
                    </div>
                  :
                  <div style={{paddingTop: '10px'}}>
                    <b>No comments</b>
                  </div>
                }
              </Col>
            </Row>
          </div>
        </div>
      </Panel>
    );
  }
}
