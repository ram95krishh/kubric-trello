import {
  takeLatest,
  all,
  call,
  put,
  putResolve,
  select,
} from 'redux-saga/effects';

import {
  FETCH_BOARD_SAGA,
  SET_SELECTED,
  ADD_LIST_SAGA,
  DELETE_LIST_SAGA,
  SET_FETCHING,
} from './types';

import Noty from '../../../lib/Noty';
import BoardHelpers from './Helpers/boards';

function* fetchBoardById({ payload: name }) {
  try {
    const selectedBoardPath = yield call(BoardHelpers.getBoardById, name);
    yield putResolve({ type: SET_SELECTED, payload: selectedBoardPath });
    yield put({ type: SET_FETCHING, payload: false });
  } catch (e) {
    Noty('Oops', 'Sorry, Something went wrong!', 'error');
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

function* watchFetchBoard() {
  yield takeLatest(FETCH_BOARD_SAGA, fetchBoardById);
}

function* watchAddList() {
  yield takeLatest(ADD_LIST_SAGA, addListToBoard);
}

function* watchDeleteList() {
  yield takeLatest(DELETE_LIST_SAGA, deleteListById);
}

export const TestExports = {
  fetchBoardById,
};

// eslint-disable-next-line
export function* combinedSagas() {
  yield all([
    watchFetchBoard(),
    watchAddList(),
    watchDeleteList(),
  ]);
}
