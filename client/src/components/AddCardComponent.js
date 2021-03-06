import React from 'react'
import { connect } from 'react-redux'
import TextAreaForm from './TextAreaForm'
import { addCard } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit (text) {
    dispatch(addCard({text, listId: ownProps.listId}))
  }
})

export default connect(null, mapDispatchToProps)(TextAreaForm)
