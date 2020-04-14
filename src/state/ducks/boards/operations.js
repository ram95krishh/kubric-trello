import {
  fetchBoardByIdAction,
  addListAction,
  deleteListAction,
  addBoardAction,
  changeBoardAction,
  recordListBeingDraggedAction,
  recordListLastDraggedOverAction,
  reorderListsAction,
} from './actions';

import Noty from '../../../lib/Noty';

const fetchBoardById = dispatch => (payload) => {
  Noty('Success!', 'Fetching your board', 'success', 'bottomLeft');
  dispatch(fetchBoardByIdAction(payload));
};

const addBoard = dispatch => payload => dispatch(addBoardAction(payload));

const changeBoard = dispatch => (payload) => {
  localStorage.setItem('lastVisitedBoard', payload.boardId);
  Noty('....', `Switching to ${payload.boardName} Board`, 'warning');
  dispatch(changeBoardAction(payload.boardId));
};

const addList = dispatch => payload => dispatch(addListAction(payload));

const deleteList = dispatch => payload => dispatch(deleteListAction(payload));

const recordListBeingDragged = dispatch => payload => dispatch(
  recordListBeingDraggedAction(payload),
);

const recordListLastDraggedOver = dispatch => payload => dispatch(
  recordListLastDraggedOverAction(payload),
);

const reorderLists = dispatch => () => dispatch(reorderListsAction());

const operations = {
  addList,
  deleteList,
  fetchBoardById,
  addBoard,
  changeBoard,
  recordListBeingDragged,
  recordListLastDraggedOver,
  reorderLists,
};

export default operations;
