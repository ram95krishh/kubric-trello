import { createReducer } from 'reduxsauce';

import {
  SET_STARTUP_COMPLETED,
} from './types';

const setStartUpCompleted = state => ({
  ...state,
  completed: true,
});

const INITIAL_STATE = {
  completed: false,
};

export default createReducer(INITIAL_STATE, {
  [SET_STARTUP_COMPLETED]: setStartUpCompleted,
});
