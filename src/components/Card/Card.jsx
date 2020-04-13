/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { pathOr } from 'ramda';

import removeIcon from '../../assets/icons/remove.png';
import './Card.css';

const Card = ({ id, updateCard, deleteCard }) => {
  useFirestoreConnect([{
    collection: 'cards',
    doc: id,
  }]);

  const textareaLineHeight = 18;

  const handleChange = (event) => {
    updateCard({
      cardId: id,
      content: event.target.value,
    });
    // eslint-disable-next-line no-bitwise
    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    if (currentRows > 2) {
      if (currentRows > 8) {
        event.target.rows = 8;
      } else {
        event.target.rows = currentRows;
      }
    }
  };

  const card = useSelector(state => pathOr(null, ['firestore', 'data', 'cards', id], state));

  if (!card) return null;

  return (
    <div styleName="cardItem">
      <div onClick={() => deleteCard(id)} onKeyPress={() => {}} role="button" styleName="removeIconArea" tabIndex="0">
        <img alt="delete" src={removeIcon} styleName="removeIcon" />
      </div>
      <textarea onChange={handleChange} styleName="cardInput" value={card.content} />
    </div>
  );
};

Card.propTypes = {
  deleteCard: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  updateCard: PropTypes.func.isRequired,
};

export default Card;
