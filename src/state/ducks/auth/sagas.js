import {
  takeLatest,
  all,
  call,
  put,
} from 'redux-saga/effects';

import {
  SIGN_UP_SAGA,
  SET_AUTHENTICATED,
  SET_USER,
  LOGIN_SAGA,
} from './types';
import Noty from '../../../lib/Noty';
import FirebaseHelpers from './Helpers/firebase';
import { loginErrorCodes } from '../../../utils/constants';

function* initiateSignUp({ payload }) {
  try {
    const newUser = yield call(FirebaseHelpers.signUp, payload);
    yield put({ type: SET_USER, payload: newUser });
    yield put({ type: SET_AUTHENTICATED });
    Noty('Success!', 'Login Successful!', 'success');
  } catch (e) {
    Noty('Oops', 'Sorry, Something went wrong!', 'error');
  }
}

function* initaiteLogin({ payload }) {
  try {
    const user = yield call(FirebaseHelpers.login, payload);
    yield put({ type: SET_USER, payload: user });
    yield put({ type: SET_AUTHENTICATED });
    Noty('Success!', 'Successfully Logged In!', 'success');
  } catch (err) {
    if (err.code) {
      switch (err.code) {
        case `${loginErrorCodes.WRONG_PWD}`:
          Noty('Error', 'Incorrect password', 'error');
          break;
        case `${loginErrorCodes.USER_NOT_FOUND}`:
          Noty('Error', 'A user with that email was not found', 'error');
          break;
        default:
          break;
      }
    } else {
      Noty('Error', 'Sorry something went wrong', 'error');
      console.log(err.message);
    }
  }
}

function* watchSignups() {
  yield takeLatest(SIGN_UP_SAGA, initiateSignUp);
}

function* watchLogins() {
  yield takeLatest(LOGIN_SAGA, initaiteLogin);
}

export const TestExports = {
  initiateSignUp,
  initaiteLogin,
};

export function* combinedSagas() {
  yield all([
    watchSignups(),
    watchLogins(),
  ]);
}
