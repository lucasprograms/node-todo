import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../styles/board.css'
import List from './List'
import AddListComponent from './AddListComponent'

const mapStateToProps = (state) => {
  return { lists: state.lists.items }
}

class Board extends Component {
  static propTypes = {
    lists: PropTypes.array
  }

  render () {
    const { lists } = this.props

    return (
      <div className="board">
        {lists.map(list => <List key={list._id} {...list} />)}
        <AddListComponent />
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Board)
