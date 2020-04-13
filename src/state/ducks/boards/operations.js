import {
  fetchBoardByIdAction,
  addListAction,
  deleteListAction,
} from './actions';

import Noty from '../../../lib/Noty';

const fetchBoardById = dispatch => (payload) => {
  Noty('Success!', 'Fetching your board', 'success', 'bottomLeft');
  dispatch(fetchBoardByIdAction(payload));
};

const addList = dispatch => payload => dispatch(addListAction(payload));

const deleteList = dispatch => payload => dispatch(deleteListAction(payload));

const operations = {
  addList,
  deleteList,
  fetchBoardById,
};

export default operations;
