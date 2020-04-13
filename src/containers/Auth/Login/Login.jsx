import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import { emailRegex } from '../../../utils/constants';
import Noty from '../../../lib/Noty';
import './Login.css';

const Login = ({ setValue, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error] = useState(null);

  const validateEntries = () => {
    if (!password.trim()) {
      Noty('Validation error', 'Password seems to be empty!', 'error');
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
      email,
      password,
    };
    if (validateEntries()) {
      login(payload);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div>
      <div styleName="loginArea">
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
          styleName="signInButton"
          variant="contained"
        >
          Sign In
        </Button>
        <div>
          Don&apos;t have an account?
        </div>
        <Button
          color="primary"
          onClick={() => setValue(1)}
          size="small"
          variant="outlined"
        >
          Sign up here
        </Button>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Login;
