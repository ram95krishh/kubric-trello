import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Noty from '../../lib/Noty';
import './AddBoard.css';

const AddBoard = ({ addBoard, setVisibility }) => {
  const [boardName, handleNameChange] = useState('');

  const validateAndAddBoard = () => {
    if (!boardName.trim()) {
      Noty('Yikes', 'Enter a valid name for the board!', 'error');
    } else {
      const successCallback = () => {
        setVisibility(false);
        handleNameChange('');
      };
      addBoard({
        boardName,
        successCallback,
      });
    }
  };

  return (
    <div styleName="boardTitleArea">
      <input
        onChange={event => handleNameChange(event.target.value)}
        placeholder="Board name"
        styleName="titleInput"
        type="text"
        value={boardName}
      />
      <button
        onClick={validateAndAddBoard}
        styleName="titleButtons"
        type="submit"
      >
        Add
      </button>
      <button
        onClick={() => setVisibility(false)}
        styleName="titleButtons"
        type="button"
      >
        Cancel
      </button>
    </div>
  );
};

AddBoard.propTypes = {
  addBoard: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

export default AddBoard;
