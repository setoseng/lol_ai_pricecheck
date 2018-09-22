import React, { Component } from 'react';
import './App.css';
import ori from './ori.png'

import Layout from './components/layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="OriHead">

          </div>
          <p>Price Check AI</p>
        </div>
        <div className="Input-line">
          <Layout />
        </div>
        <div className="Footer">
          <p>&copy; Data base on League of Legends. Artwork by Nialee</p>
        </div>
      </div>
    );
  }
}

export default App;
