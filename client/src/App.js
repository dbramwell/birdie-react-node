import React, { Component } from 'react';
import {connect} from 'react-redux'
import setColumns from './actions/set_columns'
import setData from './actions/set_data'
import {bindActionCreators} from 'redux'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidMount() {
    return fetch('/columns')
      .then(res => res.json())
      .then(columns => this.props.setColumns(columns));
  }

  setTableData(column) {
    return fetch(`/columns/${column}`)
      .then(res => res.json())
      .then(data => this.props.setData(data));
  }

  onSelectChange(event) {
    this.setTableData(event.target.value);
  }

  totalDisplay() {
    if (this.props.data.length > 0) {
      return <span className='total'>Total distinct values: {this.props.data[0].total_count}</span>;
    }
  }

  render() {
    return (
      <div className='App'>
        <span>Variable:
          <select onChange={this.onSelectChange} >
            {this.props.columns.map((column, index) =>
              <option key={index} value={column}>{column}</option>
            )}
          </select>
        </span>
        <div>
          {this.totalDisplay()}
        </div>
        <table>
          <tr>
            <th>Value</th>
            <th>Count</th>
            <th>Average Age</th>
          </tr>
          {this.props.data.map((d, index) =>
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

const mapStateToProps = state => {
  return {
    columns: state.columns,
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setColumns: setColumns,
    setData: setData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
