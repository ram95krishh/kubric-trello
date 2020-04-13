import React from 'react';
import PropTypes from 'prop-types';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import { pathOr } from 'ramda';

import delIcon from '../../assets/icons/delete.png';
import { operations as listOperations } from '../../state/ducks/lists';
import Card from '../../components/Card';
import './List.css';

const List = ({ id, deleteList }) => {
  useFirestoreConnect([{
    collection: 'lists',
    doc: id,
  }]);

  const dispatch = useDispatch();
  const addCard = listOperations.addCard(dispatch);
  const deleteCard = listOperations.deleteCard(dispatch);
  const updateCard = listOperations.updateCard(dispatch);

  const list = useSelector(state => pathOr({}, ['firestore', 'data', 'lists', id], state));
  const cards = list.cards || [];

  const deleteListFn = () => {
    const payload = {
      listId: id,
      listName: list.name,
    };
    deleteList(payload);
  };

  return (
    <div>
      <div styleName="listContainer">
        <div styleName="listHeader">
          <div styleName="listTitle">{list.name}</div>
          <div onClick={deleteListFn} onKeyPress={() => {}} role="button" styleName="deleteIconArea" tabIndex="0">
            <img alt="delete" src={delIcon} styleName="deleteIcon" />
          </div>
        </div>
        <div>
          {cards.map(card => (
            <Card
              deleteCard={deleteCard}
              id={card.id}
              updateCard={updateCard}
            />
          ))}
        </div>
        <div onClick={() => addCard(id)} onKeyPress={() => {}} role="button" styleName="addCardArea" tabIndex="0">
          Add a card...
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  deleteList: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default List;
