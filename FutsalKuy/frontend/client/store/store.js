import { createStore } from 'redux';
import reducers from './reducers/index';
import middlewares from './middlewares/index';
const store = createStore(reducers, middlewares);
export default store;