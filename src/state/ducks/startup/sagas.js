import {
  all,
  put,
  putResolve,
  takeLatest,
} from 'redux-saga/effects';

import {
  INIT_START_UP_TASKS_SAGA,
  SET_STARTUP_COMPLETED,
} from './types';

import {
  SET_AUTHENTICATED,
  SET_USER,
} from '../auth/types';

function* initStartUpTasks() {
  const user = JSON.parse(localStorage.getItem('authUser'));
  if (user) {
    yield putResolve({ type: SET_USER, payload: user });
    yield putResolve({ type: SET_AUTHENTICATED });
  }
  yield put({ type: SET_STARTUP_COMPLETED });
}

function* watchStartupTasksInit() {
  yield takeLatest(INIT_START_UP_TASKS_SAGA, initStartUpTasks);
}

export const TestExports = {
  watchStartupTasksInit,
  initStartUpTasks,
};

// eslint-disable-next-line import/prefer-default-export
export function* combinedSagas() {
  yield all([
    watchStartupTasksInit(),
  ]);
}
