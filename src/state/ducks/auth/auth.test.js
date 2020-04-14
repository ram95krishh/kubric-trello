import { put, takeLatest, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import * as actionTypes from './types';
import { TestExports } from './sagas';
import FirebaseHelpers from './Helpers/firebase';


describe('Auth Watchers', () => {
  it(`watchSignups should call initiateSignup on ${actionTypes.SIGN_UP_SAGA} action`, () => {
    const saga = cloneableGenerator(TestExports.watchSignups)();
    expect(saga.next().value)
      .toEqual(takeLatest(
        actionTypes.SIGN_UP_SAGA,
        TestExports.initiateSignUp,
      ));
  });

  it(`watchLogins should call initiateLogin on ${actionTypes.LOGIN_SAGA} action`, () => {
    const saga = cloneableGenerator(TestExports.watchLogins)();
    expect(saga.next().value)
      .toEqual(takeLatest(
        actionTypes.LOGIN_SAGA,
        TestExports.initaiteLogin,
      ));
  });
});

describe('initiateSignUp', () => {
  const payload = {
    displayName: 'Tester',
    email: 'abc@xyz.com',
    password: 'password',
  };
  const signedUpUser = {
    uid: '1234567890',
    email: payload.email,
    displayName: payload.email,
  };
  const saga = cloneableGenerator(TestExports.initiateSignUp)({ payload });

  it('initiateSignUp should call FirebaseHelpers.signup with credentials payload', () => {
    expect(saga.next().value)
      .toEqual(call(FirebaseHelpers.signUp, payload));
  });

  it(`initiateSignUp should trigger ${actionTypes.SET_USER} action with signed Up User`, () => {
    expect(saga.next(signedUpUser).value)
      .toEqual(put({
        type: actionTypes.SET_USER,
        payload: signedUpUser,
      }));
  });

  it(`initiateSignUp should trigger ${actionTypes.SET_AUTHENTICATED} action finally`, () => {
    expect(saga.next().value)
      .toEqual(put({
        type: actionTypes.SET_AUTHENTICATED,
      }));
  });

  it('initiateSignUp should be done', () => {
    expect(saga.next().value)
      .toEqual();
  });
});

describe('initiateLogin', () => {
  const payload = {
    email: 'abc@xyz.com',
    password: 'password',
  };
  const loggedInUser = {
    uid: '1234567890',
    email: 'abc@xyz.com',
    displayName: 'Tester',
  };
  const saga = cloneableGenerator(TestExports.initaiteLogin)({ payload });

  it('initiateLogin should call FirebaseHelpers.login with credentials payload', () => {
    expect(saga.next().value)
      .toEqual(call(FirebaseHelpers.login, payload));
  });

  it(`initiateLogin should trigger ${actionTypes.SET_USER} action with logged-in User`, () => {
    expect(saga.next(loggedInUser).value)
      .toEqual(put({
        type: actionTypes.SET_USER,
        payload: loggedInUser,
      }));
  });

  it(`initiateLogin should trigger ${actionTypes.SET_AUTHENTICATED} action finally`, () => {
    expect(saga.next().value)
      .toEqual(put({
        type: actionTypes.SET_AUTHENTICATED,
      }));
  });

  it('initiateLogin should be done', () => {
    expect(saga.next().value)
      .toEqual();
  });
});
