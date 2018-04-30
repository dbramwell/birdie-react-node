import setData from './set_data'

describe('setData', () => {
  it('should create an action to set data', () => {
    const sexData = [
      {value: 'Male', count: 5, 'average age': 30.5},
      {value: 'Female', count: 6, 'average age': 29.5}
    ]
    const expectedAction = {
      type: 'SET_DATA',
      payload: sexData
    }
    expect(setData(sexData)).toEqual(expectedAction)
  })
})