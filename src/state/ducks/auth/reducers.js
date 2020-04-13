import { createReducer } from 'reduxsauce';

import {
  SET_AUTHENTICATED,
  SET_USER,
} from './types';

const setAuthenticated = state => ({
  ...state,
  isAuthenticated: true,
});

const setUser = (state, { payload }) => ({
  ...state,
  user: payload,
});

const INITIAL_STATE = {
  isAuthenticated: false,
};

export default createReducer(INITIAL_STATE, {
  [SET_AUTHENTICATED]: setAuthenticated,
  [SET_USER]: setUser,
});
