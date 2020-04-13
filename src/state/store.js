import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import firebase from 'firebase/app';

import { reducers, sagas } from './ducks';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'kubrik-trello.firebaseapp.com',
  databaseURL: 'https://kubrik-trello.firebaseio.com',
  projectId: 'kubrik-trello',
  storageBucket: 'kubrik-trello.appspot.com',
  messagingSenderId: '958021637108',
  appId: '1:958021637108:web:5455c3978ed8554e679fa1',
  measurementId: 'G-GL19TE27NR',
};

firebase.initializeApp(firebaseConfig);

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware);
  }

  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(
        ...middlewares,
      ),
    ),
  );

  let sagaTask = sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./ducks', () => {
      /* eslint-disable-next-line */
      const { reducers, sagas } = require('./ducks');

      store.replaceReducer(reducers);
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(sagas);
      });
    });
  }
  return store;
}
