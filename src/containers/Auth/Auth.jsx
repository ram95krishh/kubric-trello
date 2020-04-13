import React from 'react';
import {
  AppBar, Tabs, Tab, Box,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { operations as authOperations } from '../../state/ducks/auth';
import Login from './Login';
import SignUp from './SignUp';
import './Auth.css';

function TabPanel(props) {
  const {
    children, value, index,
  } = props;

  return (
    <div styleName="tabArea">
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Auth = ({ signUp, login }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const a11yProps = index => ({
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  });

  return (
    <div styleName="container">
      <img
        alt="logo"
        src="https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png"
        styleName="logo"
      />
      <div styleName="authContainer">
        <AppBar color="default" position="static">
          <Tabs
            aria-label="full width tabs example"
            indicatorColor="primary"
            onChange={handleChange}
            textColor="primary"
            value={value}
            variant="fullWidth"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Sign-Up" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis="x"
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel index={0} value={0}>
            <Login login={login} setValue={setValue} />
          </TabPanel>
          <TabPanel index={1} value={1}>
            <SignUp signUp={signUp} />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

Auth.propTypes = {
  login: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  login: authOperations.login(dispatch),
  signUp: authOperations.signUp(dispatch),
});

export default connect(null, mapDispatchToProps)(Auth);
