import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

beforeEach(() => {
  fetch.resetMocks();
  fetch.once(JSON.stringify(['col1', 'col2']));
})

it('app loads columns from api after mounting and sets them to options', async () => {
  const app = shallow(<App />)
  expect(app.state().columns).toEqual([]);
  expect(app.find('option').length).toBe(0);
  fetch.once(JSON.stringify(['col1', 'col2']))
  await app.instance().componentDidMount();
  expect(fetch.mock.calls[0][0]).toEqual('/columns')
  app.update();
  expect(app.state().columns).toEqual(['col1', 'col2']);
  expect(app.find('option').length).toBe(2);
});

it('setTableData loads column data from the api and sets to state', async () => {
  const sexData = [
    {value: 'Male', count: 5, 'average age': 30.5},
    {value: 'Female', count: 6, 'average age': 29.5}
  ];
  const app = shallow(<App />);
  expect(app.state().data).toEqual([]);
  fetch.once(JSON.stringify(sexData));
  await app.instance().setTableData('sex');
  expect(fetch.mock.calls[1][0]).toEqual('/columns/sex');
  expect(app.state().data).toEqual(sexData);
});

it('table on page is populated with data from state', () => {
  const app = shallow(<App />);
  app.setState({data: [{value: 'Male', count: 5, 'average age': 50}]});
  expect(app.find('table td.value').text()).toBe('Male');
  expect(app.find('table td.count').text()).toBe('5');
  expect(app.find('table td.average-age').text()).toBe('50');
});

it('if values are null then show N/A in table', () => {
  const app = shallow(<App />);
  app.setState({data: [{value: null, count: 5, 'average age': null}]});
  expect(app.find('table td.value').text()).toBe('N/A');
  expect(app.find('table td.average-age').text()).toBe('N/A');
});