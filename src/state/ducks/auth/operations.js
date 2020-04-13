import {
  signUpAction,
  loginAction,
} from './actions';

const signUp = dispatch => payload => dispatch(signUpAction(payload));

const login = dispatch => payload => dispatch(loginAction(payload));

const operations = {
  signUp,
  login,
};

export default operations;
