import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import { reducers as auth } from './auth';
import { reducers as boards } from './boards';
// import { reducers as lists } from './lists';
import { reducers as startup } from './startup';

const rootReducer = combineReducers({
  auth,
  boards,
  startup,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
