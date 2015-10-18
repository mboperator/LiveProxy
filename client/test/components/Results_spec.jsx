import React from 'react/addons';
import { List, Map } from 'immutable';
import { Results } from '../../src/components/Results';
import { expect } from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} = React.addons.TestUtils;

const { describe, it } = global;

const defaultPair = List.of('Trainspotting', '28 Days Later');

describe('Results', () => {

  it('renders entries with vote counts of zero', () => {
    const pair = defaultPair;
    const tally = Map({'Trainspotting': 5});
    const component = renderIntoDocument(
      <Results tally={tally} pair={pair}/>
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    expect(entries[0].getDOMNode().textContent).to.contain('Trainspotting');
    expect(entries[0].getDOMNode().textContent).to.contain(5);
    expect(entries[1].getDOMNode().textContent).to.contain('28 Days Later');
    expect(entries[1].getDOMNode().textContent).to.contain(0);
  });

  it('invokes the next callback when next button is clicked', () => {
    const pair = defaultPair;
    const tally = Map({'Trainspotting': 5});

    let nextInvoked = false;
    let next = () => { nextInvoked = true; };

    const component = renderIntoDocument(
      <Results tally={tally} pair={pair} next={next}/>
    );
    const nextButton = component.refs.next;
    Simulate.click(nextButton.getDOMNode());

    expect(nextInvoked).to.equal(true);
  });

  it('renders a winner when there is one', () => {
    const pair = defaultPair;
    const tally = Map();
    const component = renderIntoDocument(
      <Results
        tally={tally}
        pair={pair}
        winner='Trainspotting'
      />
    );
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });
});
