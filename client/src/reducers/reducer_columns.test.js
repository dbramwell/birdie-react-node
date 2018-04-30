import columnsReducer from './reducer_columns'

describe('columnsReducer', () => {
  it('should return action payload when action type is SET_COLUMNS', () => {
    const columns = ['col1', 'col2']
    const action = {
      type: 'SET_COLUMNS',
      payload: columns
    }
    expect(columnsReducer([], action)).toEqual(columns)
  })

  it('should return state when action type is not recognised', () => {
    const columns = ['col1', 'col2']
    const action = {
      type: 'NOT_RECOGNISED',
      payload: columns
    }
    expect(columnsReducer([], action)).toEqual([])
  })
})