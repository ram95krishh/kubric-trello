import {
  takeLatest,
  takeEvery,
  all,
  call,
  put,
  putResolve,
  select,
} from 'redux-saga/effects';
import { pathOr } from 'ramda';

import {
  FETCH_BOARD_SAGA,
  SET_SELECTED,
  ADD_LIST_SAGA,
  DELETE_LIST_SAGA,
  SET_FETCHING,
  ADD_BOARD_SAGA,
  REORDER_LISTS_SAGA,
} from './types';

import Noty from '../../../lib/Noty';
import BoardHelpers from './Helpers/boards';

function* fetchBoardById({ payload: name }) {
  try {
    const selectedBoardPath = yield call(BoardHelpers.getBoardById, name);
    yield putResolve({ type: SET_SELECTED, payload: selectedBoardPath });
    yield put({ type: SET_FETCHING, payload: false });
  } catch (err) {
    Noty('Oops', 'Sorry, Something went wrong!', 'error');
    console.log(err.message);
  }
}

function* addListToBoard({ payload: listTitle }) {
  const boardId = yield select(state => state.boards.selected);
  const userId = yield select(state => state.auth.user.uid);
  const selectedBoard = yield select(state => state.firestore.data.boards[boardId]);
  yield call(BoardHelpers.addListToBoard, listTitle, boardId, userId, selectedBoard);
}

function* deleteListById({ payload: { listName, listId } }) {
  try {
    const boardId = yield select(state => state.boards.selected);
    const selectedBoard = yield select(state => state.firestore.data.boards[boardId]);
    const selectedList = yield select(state => state.firestore.data.lists[listId]);
    const cardsToDelete = selectedList.cards || [];
    yield call(BoardHelpers.deleteListById, listId, boardId, selectedBoard, cardsToDelete);
    Noty('Success', `${listName} was deleted successfully`, 'success');
  } catch (err) {
    Noty('Oops', `${listName} couldn't be deleted`, 'error');
    console.log(err.message);
  }
}
function* addBoard({ payload: { boardName, successCallback } }) {
  try {
    const userId = yield select(state => state.auth.user.uid);
    const newBoardId = yield call(BoardHelpers.createBoardWithName, boardName, userId);
    yield putResolve({ type: SET_SELECTED, payload: newBoardId });
    Noty('Success', `Created the board ${boardName} successfully`, 'success');
    successCallback();
  } catch (err) {
    Noty('Yikes', 'Sorry, unable to create board, try later!', 'error');
    console.log(err.message);
  }
}

function* reorderLists() {
  try {
    const {
      listBeingDragged: from,
      listLastDraggedOver: to,
    } = yield select(state => state.boards);
    const activeBoardId = yield select(state => pathOr('', ['boards', 'selected'], state));
    const listRefs = yield select(state => pathOr({}, ['firestore', 'data', 'boards', activeBoardId, 'lists'], state));
    yield call(BoardHelpers.reorderLists, from, to, activeBoardId, listRefs);
  } catch (err) {
    Noty('Oops', 'Sorry, unable to reorder lists right now!', 'error');
    console.log(err.message);
  }
}

function* watchFetchBoard() {
  yield takeLatest(FETCH_BOARD_SAGA, fetchBoardById);
}

function* watchAddList() {
  yield takeLatest(ADD_LIST_SAGA, addListToBoard);
}

function* watchDeleteList() {
  yield takeLatest(DELETE_LIST_SAGA, deleteListById);
}

function* watchAddBoard() {
  yield takeLatest(ADD_BOARD_SAGA, addBoard);
}

function* watchReorderLists() {
  yield takeEvery(REORDER_LISTS_SAGA, reorderLists);
}

export const TestExports = {
  watchFetchBoard,
  watchAddList,
  watchDeleteList,
  watchAddBoard,
  fetchBoardById,
  addListToBoard,
  deleteListById,
  addBoard,
};

export function* combinedSagas() {
  yield all([
    watchFetchBoard(),
    watchAddList(),
    watchDeleteList(),
    watchAddBoard(),
    watchReorderLists(),
  ]);
}
