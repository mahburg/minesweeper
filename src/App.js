import React, { Component } from 'react';

import Board from './components/Board/Board'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lloyd's Minesweeper Clone</h1>
        </header>
        <section>
          <Board/>
        </section>
      </div>
    );
  }
}

export default App;
