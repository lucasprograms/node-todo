import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome'
import '../styles/card.css';

export default class Card extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    const {
      text,
      deleteClickHandler
    } = this.props;

    return (
      <div 
        className="card" 
      >
        {text}
        <span class="card__delete-button" onClick={deleteClickHandler}><FontAwesome name="close"/></span>
      </div>
    )
  }
}
