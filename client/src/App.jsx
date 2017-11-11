import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      todos: [],
      newTodoText: ''
    }
  }

  componentDidMount () {
    this.getTodos()
  }

  deleteTodo (e, id) {
    e.preventDefault()

    fetch('/todo', {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ id })
    })
    .then(() => {
      const newTodos = this.state.todos.filter(todo => todo._id !== id)
      this.setState({
        todos: newTodos
      })
    })
    .catch((error) => {
      console.error('error in post request: ', error)
    })
  }

  getTodos () {
    fetch('/todos')
    .then(res => res.json())
    .then(todos => { this.setState({ todos }) })
  }

  handleTodoSubmit (e) {
    e.preventDefault()

    fetch('/todos', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ text: this.state.newTodoText })
    })
    .then(resp => resp.json())
    .then((json) => {
      const { _id, text } = json[0]
      this.setState({
        newTodoText: '',
        todos: [ ...this.state.todos, { _id, text } ] 
      })
    })
    .catch((error) => {
      console.error('error in post request: ', error)
    })

  }

  updateTodoText (e) {
    this.setState({
      newTodoText: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo._id}>
              {todo.text} | 
              <button onClick={(e) => this.deleteTodo(e, todo._id)}>&times;</button>
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => this.handleTodoSubmit(e)}>
          <input type="text" 
                 name="text"
                 onChange={(e) => this.updateTodoText(e)}
                 placeholder="let's do this"
                 value={this.state.newTodoText}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default App;
