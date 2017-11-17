import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux'
import flow from 'lodash.flow'
import '../styles/list.css'
import ItemTypes from '../constants/dndTypes';
import Card from './Card'

const dropTargetSpec = {
  drop: (props, monitor, component) => {
  }
};

const collect = connect => ({
  connectDropTarget: connect.dropTarget(),
});

const mapStateToProps = (state) => {
  return { cards: state.cards.items }
}

class List extends Component {
  static defaultProps = {
    cards: { items: [] }
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
    connectDropTarget: PropTypes.func.isRequired,
  }

  render() {
    const { cards, children, connectDropTarget } = this.props

    const sortByOrdinalValue = (a, b) => {
      if (a > b) {
        return 1
      } else {
        return -1
      }
    }
    
    return (
      connectDropTarget(
        <ul className="list">
          {cards.sort(sortByOrdinalValue).map(card => <Card key={card._id} {...card} />)}
        </ul>
      )
    );
  }
};

export default flow([
  connect(mapStateToProps),
  DropTarget(ItemTypes.CARD, dropTargetSpec, collect)
])(List)
