import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  state = {columns: []}

  componentDidMount() {
    return fetch('/columns')
      .then(res => res.json())
      .then(columns => this.setState({ columns }));
  }

  render() {
    return (
      <div className="App">
        <h1>Variable: </h1>
        <select>
          {this.state.columns.map((column, index) =>
            <option key={index} value={column}>{column}</option>
          )}
        </select>
      </div>
    );
  }
}

export default App;
