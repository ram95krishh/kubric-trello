import { all } from 'redux-saga/effects';
import { combinedSagas as authSagas } from './auth/sagas';
import { combinedSagas as boardsSagas } from './boards/sagas';
import { combinedSagas as listSagas } from './lists/sagas';
import { combinedSagas as startupSagas } from './startup/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    boardsSagas(),
    listSagas(),
    startupSagas(),
  ]);
}
