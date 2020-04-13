import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Noty from '../../lib/Noty';
import './AddList.css';

const AddList = ({ addList }) => {
  const [showActionItems, setVisibility] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleTitleChange = (event) => {
    setListTitle(event.target.value);
  };

  const validateAndAdd = (event) => {
    event.preventDefault();
    if (listTitle.trim()) {
      addList(listTitle);
      setTimeout(() => {
        setVisibility(false);
        setListTitle(null);
      }, 1000);
    } else {
      Noty('Error', 'Enter a valid title', 'error');
    }
  };

  if (showActionItems) {
    return (
      <div styleName="listTitleArea">
        <input
          onChange={handleTitleChange}
          placeholder="List title"
          styleName="titleInput"
          type="text"
          value={listTitle}
        />
        <div styleName="actionButtonsArea">
          <button
            onClick={validateAndAdd}
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
      </div>
    );
  }
  return (
    <div onClick={() => setVisibility(true)} onKeyPress={() => {}} role="button" styleName="addListArea" tabIndex="0">
      Add list...
    </div>
  );
};

AddList.propTypes = {
  addList: PropTypes.func.isRequired,
};

export default AddList;
