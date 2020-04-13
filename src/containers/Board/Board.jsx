import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { pathOr } from 'ramda';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';

import List from '../List';
import AddList from '../../components/AddList';
import AddBoard from '../../components/AddBoard';
import { operations as boardOperations } from '../../state/ducks/boards';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { showAddBoard: false };
  }

  componentDidMount() {
    const { id, fetchBoardById } = this.props;
    fetchBoardById(id);
  }

  setVisibility(value = false) {
    this.setState({ showAddBoard: value });
  }

  handleBoardChange(event, boardOptions) {
    const { changeBoard } = this.props;
    if (event.target.value === 'add') {
      this.setVisibility(true);
    } else {
      const { selectedIndex } = event.target;
      changeBoard({
        boardId: event.target.value,
        boardName: boardOptions[selectedIndex].name,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  loader() {
    return (
      <div styleName="loaderContainer">
        <div styleName="loader" />
      </div>
    );
  }

  renderBoardOptions() {
    const { boards = {}, selected, addBoard } = this.props;
    const { showAddBoard } = this.state;

    if (showAddBoard) {
      return <AddBoard addBoard={addBoard} setVisibility={() => this.setVisibility()} />;
    }

    const boardOptions = Object.keys(boards).map(key => ({ id: key, ...boards[key] }));
    return (
      <select onChange={event => this.handleBoardChange(event, boardOptions)} styleName="boardOptions" value={selected}>
        {boardOptions.map(board => (
          <option name={board.name} styleName="boardOption" value={board.id}>{board.name}</option>
        ))}
        <option styleName="boardOption" value="add">Add a board</option>
      </select>
    );
  }

  renderLists() {
    const { data: { lists = [] }, deleteList } = this.props;
    if (!lists.length) return null;
    return lists.map((listRef) => {
      const listId = listRef.id;
      return <List key={`${listId}`} deleteList={deleteList} id={listId} />;
    });
  }

  renderAddList() {
    const { addList } = this.props;
    return (
      <AddList addList={addList} />
    );
  }

  render() {
    const { fetching } = this.props;
    if (fetching) {
      return this.loader();
    }
    return (
      <div styleName="boardContainer">
        {this.renderBoardOptions()}
        <div styleName="listsContainer">
          {this.renderLists()}
          {this.renderAddList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selected = pathOr({}, ['boards', 'selected'], state);
  const boards = pathOr({}, ['firestore', 'data', 'boards'], state);
  const data = pathOr({}, ['firestore', 'data', 'boards', selected], state);
  return {
    boards,
    data,
    fetching: state.boards.fetching,
    selected,
  };
};

const mapDispatchToProps = dispatch => ({
  addBoard: boardOperations.addBoard(dispatch),
  changeBoard: boardOperations.changeBoard(dispatch),
  fetchBoardById: boardOperations.fetchBoardById(dispatch),
  addList: boardOperations.addList(dispatch),
  deleteList: boardOperations.deleteList(dispatch),
});

Board.defaultProps = {
  fetching: true,
  id: localStorage.getItem('lastVisitedBoard') || 'MQpsD3Q5MVnHweWjj70J',
};

Board.propTypes = {
  addBoard: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  boards: PropTypes.shape({}).isRequired,
  changeBoard: PropTypes.func.isRequired,
  data: PropTypes.shape({
    createdBy: PropTypes.string,
    lists: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  deleteList: PropTypes.func.isRequired,
  fetchBoardById: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  id: PropTypes.string,
  selected: PropTypes.func.isRequired,
};

const enhance = compose(
  firestoreConnect(() => ['boards']),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Board);
