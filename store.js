import { createStore, combineReducers } from 'redux';
import moodReducer from './reducers/moodReducer';

const rootReducer = combineReducers({
  moods: moodReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;