import {
  INIT_START_UP_TASKS_SAGA,
} from './types';

const initStartUpTasksAction = () => ({
  type: INIT_START_UP_TASKS_SAGA,
});

export {
  // eslint-disable-next-line import/prefer-default-export
  initStartUpTasksAction,
};
