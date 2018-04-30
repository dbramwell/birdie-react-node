import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'

const initialState = {columns: [], data: []}
const mockStore = configureStore()
let store,app


beforeEach(() => {
  store = mockStore(initialState)
  app = shallow(<App store={store} /> )
})

it('renders', () => {

});

// it('app loads columns is updated by setColumns method', () => {
//   expect(app.prop('columns')).toEqual([]);
//   expect(app.find('option').length).toBe(0);
//   app.props().setColumns(['col1', 'col2']);
//   app.instance().forceUpdate()
//   expect(app.find('option').length).toBe(2);
//   expect(app.find('option')[0].text()).toBe('col1');
//   expect(app.find('option')[1].text()).toBe('col2');
// });

// it('setTableData loads column data from the api and sets to state', async () => {
//   const sexData = [
//     {value: 'Male', count: 5, 'average age': 30.5},
//     {value: 'Female', count: 6, 'average age': 29.5}
//   ];
//   expect(app.state().data).toEqual([]);
//   fetch.once(JSON.stringify(sexData));
//   await app.instance().setTableData('sex');
//   expect(fetch.mock.calls[1][0]).toEqual('/columns/sex');
//   expect(app.state().data).toEqual(sexData);
// });

// it('table on page is populated with data from state', () => {
//   app.setState({data: [{value: 'Male', count: 5, 'average age': 50}]});
//   expect(app.find('table td.value').text()).toBe('Male');
//   expect(app.find('table td.count').text()).toBe('5');
//   expect(app.find('table td.average-age').text()).toBe('50');
// });

// it('if values are null then show N/A in table', () => {
//   app.setState({data: [{value: null, count: 5, 'average age': null}]});
//   expect(app.find('table td.value').text()).toBe('N/A');
//   expect(app.find('table td.average-age').text()).toBe('N/A');
// });

// it('total number of values is shown in a span', () => {
//   app.setState({data: [{value: 'Male', count: 5, 'average age': 50, total_count: 9000}]});
//   expect(app.find('span.total').text()).toBe('Total distinct values: 9000');
// });
