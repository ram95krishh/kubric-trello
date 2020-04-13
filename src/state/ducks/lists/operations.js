import {
  addCardAction,
  updateCardAction,
  deleteCardAction,
} from './actions';

const addCard = dispatch => payload => dispatch(addCardAction(payload));

const updateCard = dispatch => payload => dispatch(updateCardAction(payload));

const deleteCard = dispatch => payload => dispatch(deleteCardAction(payload));

const operations = {
  addCard,
  deleteCard,
  updateCard,
};

export default operations;
