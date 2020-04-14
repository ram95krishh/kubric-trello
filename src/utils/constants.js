const emailRegex = /^([a-zA-Z0-9._+-]+)(@[a-zA-Z0-9-.]+)(.[a-zA-Z]{2,4}){2,}$/;
const loginErrorCodes = {
  WRONG_PWD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
};

export {
  emailRegex,
  loginErrorCodes,
};
