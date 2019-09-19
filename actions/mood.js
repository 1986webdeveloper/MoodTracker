import { ADD_MOOD, REMOVE_MOOD } from './types';

export const addMood = mood => {
  return {
    type: ADD_MOOD,
    payload: mood
  }
}

export const removeMood = key => {
  return {
    type: REMOVE_MOOD,
    payload: key
  }
}
