import React from 'react';
import PropTypes from 'prop-types';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import { pathOr } from 'ramda';

import delIcon from '../../assets/icons/delete.png';
import { operations as listOperations } from '../../state/ducks/lists';
import Card from '../../components/Card';
import './List.css';

const List = ({
  id,
  deleteList,
  index,
  recordListBeingDragged,
  recordListLastDraggedOver,
  reorderLists,
}) => {
  useFirestoreConnect([{
    collection: 'lists',
    doc: id,
  }]);

  const dispatch = useDispatch();
  const addCard = listOperations.addCard(dispatch);
  const deleteCard = listOperations.deleteCard(dispatch);
  const updateCard = listOperations.updateCard(dispatch);

  const list = useSelector(state => pathOr({}, ['firestore', 'data', 'lists', id], state));
  const listBeingDragged = useSelector(state => pathOr(null, ['boards', 'listBeingDragged'], state));
  const listLastDraggedOver = useSelector(state => pathOr(null, ['boards', 'listLastDraggedOver'], state));

  const cards = list.cards || [];

  const deleteListFn = () => {
    const payload = {
      listId: id,
      listName: list.name,
    };
    deleteList(payload);
  };

  const onDragEnd = () => {
    if (listBeingDragged === listLastDraggedOver) {
      recordListBeingDragged(null);
      recordListLastDraggedOver(null);
    } else {
      reorderLists();
    }
  };

  const onDragStart = (event, itemId) => {
    if (listBeingDragged !== itemId) {
      recordListBeingDragged(itemId);
    }
  };

  const onDragOver = (event, itemId) => {
    if (listLastDraggedOver !== itemId) {
      recordListLastDraggedOver(itemId);
    }
  };

  return (
    <div>
      <div
        draggable
        onDragEnd={() => onDragEnd()}
        onDragOver={event => onDragOver(event, index)}
        onDragStart={event => onDragStart(event, index)}
        styleName="listContainer"
        tabIndex={index}
      >
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
  index: PropTypes.number.isRequired,
  recordListBeingDragged: PropTypes.func.isRequired,
  recordListLastDraggedOver: PropTypes.func.isRequired,
  reorderLists: PropTypes.func.isRequired,
};

export default List;
