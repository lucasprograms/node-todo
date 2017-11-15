import React from 'react' // eslint-disable-line
import Footer from './Footer' // eslint-disable-line
import AddTodo from '../containers/AddTodo' // eslint-disable-line
import VisibleTodoList from '../containers/VisibleTodoList' // eslint-disable-line
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends React.Component {
  render () {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
  }
}



export default DragDropContext(HTML5Backend)(App)