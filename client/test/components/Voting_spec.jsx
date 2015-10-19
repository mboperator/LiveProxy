import React from 'react/addons';
import { Voting } from '../../src/components/Voting';
import { expect } from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
 } = React.addons.TestUtils;

const { describe, it } = global;
const defaultPair = ['Trainspotting', '28 Days Later'];

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={defaultPair}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].getDOMNode().textContent).to.equal('Trainspotting');
    expect(buttons[1].getDOMNode().textContent).to.equal('28 Days Later');
  });

  it('invokes callback when a button is pressed', () => {
    let votedWith;
    let vote = (entry) => { votedWith = entry; };
    const component = renderIntoDocument(
      <Voting
        vote={vote}
        pair={defaultPair}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0].getDOMNode());

    expect(votedWith).to.equal('Trainspotting');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting
        hasVoted='Trainspotting'
        pair={defaultPair}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].getDOMNode().hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].getDOMNode().hasAttribute('disabled')).to.equal(true);
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting
        hasVoted='Trainspotting'
        pair={defaultPair}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].getDOMNode().textContent).to.contain('Trainspotting');
  });

  it('renders winning page when we have a winner', () => {
    const component = renderIntoDocument(
      <Voting
        winner='Trainspotting'
        pair={defaultPair}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const winner = React.findDOMNode(component.refs.winner);

    expect(buttons.length).to.equal(0);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });

  it('renders as a pure component', () => {
    const pair = defaultPair;
    let component = renderIntoDocument(
      <Voting pair={pair}/>
    );
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];

    expect(firstButton.getDOMNode().textContent).to.equal('Trainspotting');

    pair[0] = 'Sunshine';
    component = renderIntoDocument(
      <Voting pair={pair}/>
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];

    expect(firstButton.getDOMNode().textContent).to.equal('Sunshine');
  });

});
