import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {columns: [], data: []}
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidMount() {
    return fetch('/columns')
      .then(res => res.json())
      .then(columns => this.setState({ columns }));
  }

  setTableData(column) {
    return fetch(`/columns/${column}`)
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  onSelectChange(event) {
    this.setTableData(event.target.value);
  }

  render() {
    return (
      <div className="App">
        <h1>Variable: </h1>
        <select onChange={this.onSelectChange} >
          {this.state.columns.map((column, index) =>
            <option key={index} value={column}>{column}</option>
          )}
        </select>
        <table>
          <tr>
            <th>Value</th>
            <th>Count</th>
            <th>Average Age</th>
          </tr>
          {this.state.data.map((d, index) =>
            <tr key={index}>
              <td className='value'>{d.value || 'N/A' }</td>
              <td className='count'>{d.count}</td>
              <td className='average-age'>{d['average age'] || 'N/A'}</td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}

export default App;
