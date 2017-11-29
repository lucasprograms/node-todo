import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import TextArea from 'react-textarea-autosize'
import PropTypes from 'prop-types'
import '../styles/text-area-form.css'

export default class TextAreaForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    closeButtonClickHandler: PropTypes.func
  }

  state = {
    textAreaText: ''
  }

  submitOnReturn (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSubmit(e)
    }
  }

  updateTextAreaText (e) {
    this.setState({
      textAreaText: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.handleSubmit(this.state.textAreaText)

    this.setState({
      textAreaText: ''
    })
  }

  handleClose (e) {
    e.preventDefault()

    this.setState({
      textAreaText: ''
    })

    this.props.closeButtonClickHandler()
  }

  render () {
    return (
      <div className="text-area-form">
        <form onSubmit={((e) => this.handleSubmit(e))}>
          <TextArea type="text"
            value={this.state.textAreaText}
            onKeyDown={(e) => this.submitOnReturn(e)}
            onChange={(e) => this.updateTextAreaText(e) }
          />
          <button><FontAwesome name='check' size='2x' /></button>
          {
            this.props.closeButtonClickHandler ? <button onClick={(e) => this.handleClose(e)}><FontAwesome name='close' size='2x' /></button> : null
          }
        </form>
      </div>
    )
  }
}
