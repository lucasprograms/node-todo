import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import flow from 'lodash.flow'
import ItemTypes from '../constants/dndTypes'
import { updateCard, updateOrdinalValue } from '../actions'
import '../styles/card.css';

const mapDispatchToProps = (dispatch) => ({
  updateCard (id) {
    dispatch(updateCard(id, { ordinalValue: Math.random() * 100}))
  },
  updateOrdinalValue (id, updatedOrdinalValue) {
    dispatch(updateOrdinalValue(id, updatedOrdinalValue))
  }
})

const dropSpec = {
  hover(props, monitor, component) {
    const draggedCardOrdinalValue = monitor.getItem().ordinalValue
    const hoveredCardOrdinalValue = props.ordinalValue

    
    if (draggedCardOrdinalValue === hoveredCardOrdinalValue) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    		// Dragging downwards
		if (draggedCardOrdinalValue < hoveredCardOrdinalValue && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (draggedCardOrdinalValue > hoveredCardOrdinalValue && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
    // to avoid expensive index searches.
    
    props.updateOrdinalValue(monitor.getItem().id, hoveredCardOrdinalValue)
    props.updateOrdinalValue(props._id, draggedCardOrdinalValue)
  }
}

const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  hoveringItem: monitor.getItem()
})

const dragSpec = {
  beginDrag (props) {
    return {
      id: props._id,
      height: '85px',
      ordinalValue: props.ordinalValue
    }
  }
}

const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

class Card extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    const {
      _id,
      isDragging,
      isOver,
      connectDropTarget,
      connectDragSource,
      hoveringItem,
      text,
      ordinalValue
    } = this.props;

    return (
      connectDropTarget(
      connectDragSource(
          <div 
            className="card" 
            onClick={() => {this.props.updateCard(_id)}}
            style={{
              // marginTop: isOver ? hoveringItem.height : 0
            }}>
            {ordinalValue}
          </div>
      ))
    );
  }
}

export default flow([
  DragSource(ItemTypes.CARD, dragSpec, dragCollect),
  DropTarget(ItemTypes.CARD, dropSpec, dropCollect),
  connect(null, mapDispatchToProps),
])(Card)
