import React from 'react' // eslint-disable-line
import Footer from './Footer' // eslint-disable-line
import AddTodo from '../containers/AddTodo' // eslint-disable-line
import VisibleTodoList from '../containers/VisibleTodoList' // eslint-disable-line

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App