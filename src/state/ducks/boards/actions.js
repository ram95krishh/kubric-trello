import {
  FETCH_BOARD_SAGA,
  ADD_LIST_SAGA,
  DELETE_LIST_SAGA,
} from './types';

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
  // eslint-disable-next-line import/prefer-default-export
  fetchBoardByIdAction,
  addListAction,
  deleteListAction,
};
