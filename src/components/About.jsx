import React, { Component } from 'react';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <p>
        A web-based Kanban-style list-making app like Trello built as a part of assessment for
        <a href="https://kubric.io">
          kubric.io
        </a>
        <br />
        Deployed at &nbsp;
        {/* <a href="">
          https://??
        </a> */}
        <br />
        <br />
        <h3>Features</h3>
        <ul>
          <li>
            To do
          </li>
        </ul>
      </p>
    );
  }
}

export default About;
