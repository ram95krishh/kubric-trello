import { createReducer } from 'reduxsauce';

import {
  SET_BOARD_BY_ID,
  SET_FETCHING,
  SET_SELECTED,
} from './types';

const setFetching = (state, { payload }) => ({
  ...state,
  fetching: payload,
});

const setBoardById = (state, { payload: { id, data } }) => ({
  ...state,
  boards: {
    ...state.boards,
    data: {
      ...state.boards.data,
      [id]: data,
    },
  },
});

const setSelected = (state, { payload }) => ({
  ...state,
  selected: payload,
});

const INITIAL_STATE = {
  fetching: true,
  selected: null,
  data: {},
};

export default createReducer(INITIAL_STATE, {
  [SET_BOARD_BY_ID]: setBoardById,
  [SET_FETCHING]: setFetching,
  [SET_SELECTED]: setSelected,
});
