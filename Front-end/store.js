import { createStore } from 'redux';
import DailyReducer from './Reducers/DailyReducer';

const store = createStore(DailyReducer);

export default store;