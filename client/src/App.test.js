import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

beforeEach(() => {
  fetch.resetMocks();
  fetch.once(JSON.stringify(['col1', 'col2']));
})

it('app loads columns from api after mounting and sets them to options', async () => {
  const div = document.createElement('div');
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
