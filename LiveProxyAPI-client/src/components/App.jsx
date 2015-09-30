import React from 'react/addons';
import { RouteHandler } from 'react-router';
import NavBar from './NavBar';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div style={{margin: '0 auto', width: '960px'}}>
          <RouteHandler/>
        </div>
      </div>
    );
  }
}
