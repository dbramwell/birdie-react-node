import setColumns from './set_columns'

describe('setColumns', () => {
  it('should create an action to set columns', () => {
    const columns = ['col1', 'col2']
    const expectedAction = {
      type: 'SET_COLUMNS',
      payload: columns
    }
    expect(setColumns(columns)).toEqual(expectedAction)
  })
})