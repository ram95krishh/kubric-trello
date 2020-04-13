import {
  initStartUpTasksAction,
} from './actions';

const initStartUpTasks = dispatch => () => dispatch(initStartUpTasksAction());

const operations = {
  initStartUpTasks,
};

export default operations;
