import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { pathOr } from 'ramda';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';

import List from '../List';
import AddList from '../../components/AddList';
import { operations as boardOperations } from '../../state/ducks/boards';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id, fetchBoardById } = this.props;
    fetchBoardById(id);
  }

  // eslint-disable-next-line class-methods-use-this
  loader() {
    return (
      <div styleName="loaderContainer">
        <div styleName="loader" />
      </div>
    );
  }


  renderBoardDescription() {
    const { data, data: { name } } = this.props;

    if (!Object.keys(data).length) return null;

    return (
      <div styleName="boardTitle">
        {name}
      </div>
    );
  }

  renderLists() {
    const { data: { lists = [] }, deleteList } = this.props;
    if (!lists.length) return null;
    return lists.map((listRef) => {
      const listId = listRef.id;
      return <List deleteList={deleteList} id={listId} />;
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
        {this.renderBoardDescription()}
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
  const data = pathOr({}, ['firestore', 'data', 'boards', selected], state);
  return {
    fetching: state.boards.fetching,
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBoardById: boardOperations.fetchBoardById(dispatch),
  addList: boardOperations.addList(dispatch),
  deleteList: boardOperations.deleteList(dispatch),
});

Board.defaultProps = {
  fetching: true,
  id: 'MQpsD3Q5MVnHweWjj70J',
};

Board.propTypes = {
  addList: PropTypes.func.isRequired,
  data: PropTypes.shape({
    createdBy: PropTypes.string,
    lists: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  deleteList: PropTypes.func.isRequired,
  fetchBoardById: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  id: PropTypes.string,
};

const enhance = compose(
  firestoreConnect(() => ['boards']),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Board);
