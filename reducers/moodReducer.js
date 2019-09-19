import { ADD_MOOD, REMOVE_MOOD } from '../actions/types';

const initialState = {
  mood: '',
  moods: []
};

//reducer for mood actions(add,remove mood)
const moodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOOD:
      return {
        ...state,
        moods: state.moods.concat({
          key: 'mood_'+action.payload+'_'+Date.now(),
          value: action.payload,
          date: Date.now()
        })
      };
    case REMOVE_MOOD:
      return {
        ...state,
        moods: state.moods.filter(item=> item.key !== action.payload)
      };
    default:
      return state;
  }
}

export default moodReducer;
