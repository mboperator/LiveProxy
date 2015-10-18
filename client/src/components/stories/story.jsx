import React from 'react';
import { Panel, Button, Row, Col } from 'react-bootstrap';

export default class Stories extends React.Component {
  render() {
    const { data, onDelete, sentences } = this.props;
    return (
      <Panel>
        <div style={{padding: '5px 15px'}}>
          <Row>
            <Col xs={11} md={11}>
              <h1>{data.title}</h1>
            </Col>
            <Col xs={1} md={1}>
              <div style={{paddingTop: '10px'}}>
                <Button onClick={onDelete.bind(null, data.id)}>
                  Delete
                </Button>
              </div>
            </Col>
          </Row>

          <div style={{paddingTop: '15px'}}>
            <Row>

              <Col xs={6} md={4}>
                {sentences.length ?
                    <div style={{paddingTop: '10px'}}>
                      <b>Comments</b>
                      <ul>
                        {sentences.map(sentence => {
                          return sentence.body;
                        })}
                      </ul>
                    </div>
                  :
                  <div style={{paddingTop: '10px'}}>
                    <b>No sentences</b>
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
