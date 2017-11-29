import React from 'react'
import { connect } from 'react-redux'
import TextAreaForm from './TextAreaForm'
import { addList } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit (text) {
    dispatch(addList({text, boardId: ownProps.boardId}))
  }
})

export default connect(null, mapDispatchToProps)(TextAreaForm)
