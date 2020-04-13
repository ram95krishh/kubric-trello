import {
  takeLatest,
  takeEvery,
  all,
  call,
  select,
} from 'redux-saga/effects';

import {
  ADD_CARD_SAGA,
  UPDATE_CARD_SAGA,
  DELETE_CARD_SAGA,
} from './types';
import { selectors as userSelectors } from '../auth';
import Noty from '../../../lib/Noty';
import ListHelpers from './Helpers/lists';

function* addCardToList({ payload: listId }) {
  try {
    const userId = yield select(userSelectors.getUserId);
    const existingList = yield select(state => state.firestore.data.lists[listId]);
    yield call(ListHelpers.addCardToList, listId, userId, existingList);
    Noty('Success!', 'Added a new card!', 'success');
  } catch (e) {
    Noty('Oops', 'Sorry, Something went wrong!', 'error');
  }
}

function* updateCardById({ payload: { cardId, content } }) {
  try {
    yield call(ListHelpers.updateCard, cardId, content);
  } catch (e) {
    Noty('Oops', 'Sorry, card updates are failing!', 'error');
  }
}

function* deleteCardById({ payload: cardId }) {
  try {
    yield call(ListHelpers.deleteCardById, cardId);
    Noty('Success', 'Card deleted successfully!', 'success');
  } catch (e) {
    Noty('Oops', 'Sorry, card deletion failed, try later!', 'error');
  }
}

function* watchAddCard() {
  yield takeLatest(ADD_CARD_SAGA, addCardToList);
}

function* watchUpdateCard() {
  yield takeEvery(UPDATE_CARD_SAGA, updateCardById);
}

function* watchDeleteCard() {
  yield takeLatest(DELETE_CARD_SAGA, deleteCardById);
}

export const TestExports = {
  addCardToList,
};

// eslint-disable-next-line
export function* combinedSagas() {
  yield all([
    watchAddCard(),
    watchDeleteCard(),
    watchUpdateCard(),
  ]);
}
