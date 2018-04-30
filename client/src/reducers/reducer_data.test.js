import dataReducer from './reducer_data'

describe('dataReducer', () => {

  const sexData = [
    {value: 'Male', count: 5, 'average age': 30.5},
    {value: 'Female', count: 6, 'average age': 29.5}
  ]

  it('should return action payload when action type is SET_DAtA', () => {
    const action = {
      type: 'SET_DATA',
      payload: sexData
    }
    expect(dataReducer([], action)).toEqual(sexData)
  })

  it('should return state when action type is not recognised', () => {
    const action = {
      type: 'NOT_RECOGNISED',
      payload: sexData
    }
    expect(dataReducer([], action)).toEqual([])
  })
})