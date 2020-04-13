import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { emailRegex } from '../../../utils/constants';
import Noty from '../../../lib/Noty';
import './SignUp.css';

const SignUp = ({ signUp }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEntries = () => {
    if (!displayName.trim()) {
      Noty('Validation error', 'Enter a valid display name!', 'error');
      return false;
    }
    if (!password.trim()) {
      Noty('Validation error', 'Enter a valid password!', 'error');
      return false;
    }
    if (!emailRegex.test(email)) {
      Noty('Validation error', 'Check the email entered!', 'error');
      return false;
    }
    return true;
  };

  const signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();
    const payload = {
      displayName,
      email,
      password,
    };
    if (validateEntries()) {
      signUp(payload);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'displayName':
        setDisplayName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div styleName="signupArea">
        <TextField
          label="DisplayName"
          name="displayName"
          onChange={onChangeHandler}
          styleName="field"
          value={displayName}
          variant="filled"
        />
        <TextField
          label="Email"
          name="email"
          onChange={onChangeHandler}
          styleName="field"
          value={email}
          variant="filled"
        />
        <TextField
          label="Password"
          name="password"
          onChange={onChangeHandler}
          styleName="field"
          type="password"
          value={password}
          variant="filled"
        />
        <Button
          color="primary"
          onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password); }}
          size="large"
          styleName="signUpButton"
          variant="contained"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default SignUp;
