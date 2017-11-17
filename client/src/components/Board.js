import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/board.css'
import List from './List'

export default class Board extends Component {
  static propTypes = {
    lists: PropTypes.array
  }

  render() {
    const { lists } = this.props

    return (
      <div class="board">
        {cards.sort(sortByOrdinalValue).map(card => <Card key={card._id} {...card} />)}
      </div>
    )
  }
}
