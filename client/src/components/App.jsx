import React, { Component } from 'react';
import List from './List';
import { DragDropContext } from 'react-dnd';
import '../styles/reset.css'
import 'font-awesome/css/font-awesome.css'
import HTML5Backend from 'react-dnd-html5-backend';
import AddCardComponent from './AddCardComponent'

class App extends Component {
  render() {
    return (
      <div>
        <AddCardComponent />
        <List />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
