import React, { Component } from 'react';
import './About.css';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div styleName="aboutContainer">
        <p>
          A web-based Kanban-style list-making app like Trello built as a part of assessment for
          &nbsp;
          <a href="https://kubric.io" styleName="links">
            kubric.io
          </a>
          <br />
        </p>
        <span>
          Deployed at &nbsp;
          <a href="https://kubric-trello.herokuapp.com/" styleName="links">
            https://kubric-trello.herokuapp.com/
          </a>
        </span>
      </div>
    );
  }
}

export default About;
