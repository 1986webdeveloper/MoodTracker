import { ADD_MOOD, REMOVE_MOOD } from '../actions/types';

const initialState = {
  mood: '',
  moods: []
};

const moodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOOD:
      return {
        ...state,
        moods: state.moods.concat({
          key: Math.random(),
          value: action.payload,
          date: Date.now()
        })
      };
    case REMOVE_MOOD:
      return {
        ...state,
        moods: [...state.moods.splice(0, action.payload), ...state.moods.splice(1)]
      };
    default:
      return state;
  }
}

export default moodReducer;