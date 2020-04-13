import {
  ADD_CARD_SAGA,
  UPDATE_CARD_SAGA,
  DELETE_CARD_SAGA,
} from './types';

const addCardAction = payload => ({
  type: ADD_CARD_SAGA,
  payload,
});

const updateCardAction = payload => ({
  type: UPDATE_CARD_SAGA,
  payload,
});

const deleteCardAction = payload => ({
  type: DELETE_CARD_SAGA,
  payload,
});

export {
  addCardAction,
  updateCardAction,
  deleteCardAction,
};
