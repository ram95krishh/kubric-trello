import { takeLatest, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import * as actionTypes from './types';
import { TestExports } from './sagas';

describe('Startup Watchers', () => {
  it(`watchStartupTasksInit should call initStartUpTasks() on ${actionTypes.INIT_START_UP_TASKS_SAGA} action`, () => {
    const saga = cloneableGenerator(TestExports.watchStartupTasksInit)();
    expect(saga.next().value)
      .toEqual(takeLatest(
        actionTypes.INIT_START_UP_TASKS_SAGA,
        TestExports.initStartUpTasks,
      ));
  });
});

describe('initStartUpTasks for first boot', () => {
  it(`initStartUpTasks set startup completed with ${actionTypes.SET_STARTUP_COMPLETED} action`, () => {
    const saga = cloneableGenerator(TestExports.initStartUpTasks)();
    expect(saga.next().value)
      .toEqual(put({
        type: actionTypes.SET_STARTUP_COMPLETED,
      }));
  });
});
