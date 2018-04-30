import { combineReducers } from 'redux';
import ColumnsReducer from './reducer_columns'
import DataReducer from './reducer_data'
const rootReducer = combineReducers({
  columns: ColumnsReducer,
  data: DataReducer
});
export default rootReducer;