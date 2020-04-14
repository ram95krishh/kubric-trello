import { takeLatest } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import * as actionTypes from './types';
import { TestExports } from './sagas';

describe('Board Watchers', () => {
  it(`watchFetchBoard should call fetchBoardById() on ${actionTypes.FETCH_BOARD_SAGA} action`, () => {
    const saga = cloneableGenerator(TestExports.watchFetchBoard)();
    expect(saga.next().value)
      .toEqual(takeLatest(
        actionTypes.FETCH_BOARD_SAGA,
        TestExports.fetchBoardById,
      ));
  });

  it(`watchAddBoard should call fetchBoardById() on ${actionTypes.ADD_BOARD_SAGA} action`, () => {
    const saga = cloneableGenerator(TestExports.watchAddBoard)();
    expect(saga.next().value)
      .toEqual(takeLatest(
        actionTypes.ADD_BOARD_SAGA,
        TestExports.addBoard,
      ));
  });

  it(`watchAddList should call addListToBoard() on ${actionTypes.ADD_LIST_SAGA} action`, () => {
    const saga = cloneableGenerator(TestExports.watchAddList)();
    expect(saga.next().value)
      .toEqual(takeLatest(
        actionTypes.ADD_LIST_SAGA,
        TestExports.addListToBoard,
      ));
  });

  it(`watchDeleteList should call deleteListById() on ${actionTypes.DELETE_LIST_SAGA} action`, () => {
    const saga = cloneableGenerator(TestExports.watchDeleteList)();
    expect(saga.next().value)
      .toEqual(takeLatest(
        actionTypes.DELETE_LIST_SAGA,
        TestExports.deleteListById,
      ));
  });
});
