import {
  FETCH_BOARD_SAGA,
  ADD_LIST_SAGA,
  DELETE_LIST_SAGA,
  ADD_BOARD_SAGA,
  SET_SELECTED,
  LIST_BEING_DRAGGED,
  LIST_LAST_DRAGGED_OVER,
  REORDER_LISTS_SAGA,
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

const recordListBeingDraggedAction = payload => ({
  type: LIST_BEING_DRAGGED,
  payload,
});

const recordListLastDraggedOverAction = payload => ({
  type: LIST_LAST_DRAGGED_OVER,
  payload,
});

const reorderListsAction = () => ({
  type: REORDER_LISTS_SAGA,
});

export {
  fetchBoardByIdAction,
  addListAction,
  deleteListAction,
  addBoardAction,
  changeBoardAction,
  recordListBeingDraggedAction,
  recordListLastDraggedOverAction,
  reorderListsAction,
};
