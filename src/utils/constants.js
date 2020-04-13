const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
const loginErrorCodes = {
  WRONG_PWD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
};

export {
  emailRegex,
  loginErrorCodes,
};
