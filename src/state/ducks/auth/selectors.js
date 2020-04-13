import { pathOr } from 'ramda';

const getUser = state => pathOr({}, ['auth', 'user'], state);

const getUserId = state => pathOr('', ['auth', 'user', 'uid'], state);

const isAuthenticated = state => pathOr({}, ['auth', 'isAuthenticated'], state);

const selectors = {
  getUser,
  getUserId,
  isAuthenticated,
};

export default selectors;
