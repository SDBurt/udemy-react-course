import { createStore } from 'redux';

// Redux
import reducer from './reducers/reducer';

const store = createStore(reducer);

export default store;