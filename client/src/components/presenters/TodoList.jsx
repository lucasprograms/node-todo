import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import styled from 'styled-components'

const Ul = styled.ul`
  list-style: none;
`


class TodoList extends React.Component {
  render () {
    const { isFetching, todos, onTodoClick } = this.props
    
    return (
      <Ul style={{ width: '200px' }}>
        {todos.map(todo => (
          <Todo key={todo._id}
                {...todo}
                handleTodoClick={() => onTodoClick(todo.id)}
                handleDeleteClick={() => deleteTodo(todo.id)}
          />
        ))}
      </Ul>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList;
