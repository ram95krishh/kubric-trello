import { pathOr } from 'ramda';

const isStartUpCompleted = state => pathOr(false, ['startup', 'completed'], state);

const selectors = {
  isStartUpCompleted,
};

export default selectors;
