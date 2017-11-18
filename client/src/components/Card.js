import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import '../styles/card.css'

import flow from 'lodash.flow'
import { findDOMNode } from 'react-dom'
import ItemTypes from '../constants/dndTypes'
import { DragSource, DropTarget } from 'react-dnd'

const dragSpec = {
  beginDrag (props) {
    return {
      _id: props._id,
      ordinalValue: props.ordinalValue
    }
  }
}

const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const dropSpec = {
  hover (props, monitor, component) {
    const dragOrdinalValue = monitor.getItem().ordinalValue
    const hoverOrdinalValue = props.ordinalValue

    if (dragOrdinalValue === hoverOrdinalValue) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragOrdinalValue < hoverOrdinalValue && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragOrdinalValue > hoverOrdinalValue && hoverClientY > hoverMiddleY) {
      return
    }

    props.swapOrdinalValues([props._id, monitor.getItem()._id])
    monitor.getItem().ordinalValue = hoverOrdinalValue
  }
}

const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
})

class Card extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render () {
    const {
      text,
      deleteClickHandler,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props

    return (
      connectDragSource(
        connectDropTarget(
          <div
            className="card"
            style={{ opacity: isDragging ? 0 : 1 }}
          >
            {text}
            <span className="card__delete-button" onClick={deleteClickHandler}><FontAwesome name="close"/></span>
          </div>
        )
      )
    )
  }
}

export default flow([
  DragSource(ItemTypes.CARD, dragSpec, dragCollect),
  DropTarget(ItemTypes.CARD, dropSpec, dropCollect)
])(Card)
