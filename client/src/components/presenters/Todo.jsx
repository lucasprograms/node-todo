import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd';

const Types = {
  TODO: 'todo'
}

const todoSource = {
  beginDrag (props) {
    const item = { id: props._id }
    return item
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Todo extends Component {
  render () {
    const { onClick, isCompleted, text } = this.props
    const { connectDragSource, isDragging } = this.props

    const draggingStyles = {
      border: '2px solid #CCC',
      backgroundColor: '#CCC',
      color: '#CCC'
    }

    const stationaryStyles = {
      border: '2px solid #000',
      backgroundColor: '#FFF',
      color: '#000'
    }

    const styles = {
      textDecoration: isCompleted ? 'line-through' : 'none',
      clear: 'both',
      content: '',
      display: 'block',
      padding: '5px 10px',
      margin: '5px 0',
    }
    
    return (
      connectDragSource(
        <li
          style={ isDragging ? { ...styles, ...draggingStyles} : { ...styles, ...stationaryStyles } }
        >
            {text}
            <div style={{ float: 'right' }}>&times;</div>
        </li>)
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default DragSource(Types.TODO, todoSource, collect)(Todo)