import {
  FETCH_BOARD_SAGA,
  ADD_LIST_SAGA,
  DELETE_LIST_SAGA,
  ADD_BOARD_SAGA,
  SET_SELECTED,
} from './types';

const addBoardAction = payload => ({
  type: ADD_BOARD_SAGA,
  payload,
});

const changeBoardAction = payload => ({
  type: SET_SELECTED,
  payload,
});

const fetchBoardByIdAction = payload => ({
  type: FETCH_BOARD_SAGA,
  payload,
});

const addListAction = payload => ({
  type: ADD_LIST_SAGA,
  payload,
});

const deleteListAction = payload => ({
  type: DELETE_LIST_SAGA,
  payload,
});

export {
  fetchBoardByIdAction,
  addListAction,
  deleteListAction,
  addBoardAction,
  changeBoardAction,
};
