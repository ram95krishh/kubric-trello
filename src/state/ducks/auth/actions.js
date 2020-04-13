import {
  SIGN_UP_SAGA,
  LOGIN_SAGA,
} from './types';

const signUpAction = payload => ({
  type: SIGN_UP_SAGA,
  payload,
});

const loginAction = payload => ({
  type: LOGIN_SAGA,
  payload,
});

export {
  signUpAction,
  loginAction,
};
