import { connect } from 'react-redux'
import { toggleTodo } from '../../actions'
import TodoList from '../presenters/TodoList'
import { VisibilityFilters } from '../../constants/visibilityFilters'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.isCompleted)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.isCompleted)
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos.todos, state.visibilityFilter),
    isFetching: state.todos.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
