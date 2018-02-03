import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <p>User Token</p>
          <input placeholder="Enter your user token" type="text"/>
      </div>
    );
  }
}

export default App;
