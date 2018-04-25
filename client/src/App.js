import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {columns: [], data: [], totalNumberOfValues: 0};
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
    this.setTotalNumberOfValues(event.target.value);
  }

  totalDisplay() {
    if (this.state.data.length > 0) {
      return <span className='total'>Total distinct values: {this.state.data[0].total_count}</span>;
    }
  }

  render() {
    return (
      <div className='App'>
        <span>Variable:
          <select onChange={this.onSelectChange} >
            {this.state.columns.map((column, index) =>
              <option key={index} value={column}>{column}</option>
            )}
          </select>
        </span>
        <div className='total'>
          {this.totalDisplay()}
        </div>
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
