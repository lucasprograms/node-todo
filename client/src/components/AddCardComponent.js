import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import TextArea from 'react-textarea-autosize'
import { connect } from 'react-redux'
import '../styles/add-card-component.css'
import { addCard } from '../actions'

const mapDispatchToProps = (dispatch) => ({
  submitNewCard (text, ordinalValue) {
    dispatch(addCard(text, ordinalValue))
  }
})

const mapStateToProps = (state) => {
  if (state.cards.items.length) {
    return { nextOrdinalValue: state.cards.items.slice(-1)[0]['ordinalValue'] + 1 }
  } else {
    return { nextOrdinalValue: 1 }
  }
}

class AddCardComponent extends Component {
  state = {
    newCardText: ''
  }

  updateNewCardText (e) {
    this.setState({
      newCardText: e.target.value
    })
  }

  submitNewCard (e) {
    e.preventDefault()
    this.props.submitNewCard(this.state.newCardText, this.props.nextOrdinalValue)

    this.setState({
      newCardText: ''
    })
  }

  handleClose (e) {
    e.preventDefault()

    this.setState({
      newCardText: ''
    })

    this.props.closeButtonClickHandler()
  }

  render () {
    return (
      <div className="add-card-component">
        <form onSubmit={((e) => this.submitNewCard(e))}>
          <TextArea type="text" value={this.state.newCardText} onChange={(e) => this.updateNewCardText(e) } />
          <button><FontAwesome name='check' size='2x' /></button>
          <button onClick={(e) => this.handleClose(e)}><FontAwesome name='close' size='2x' /></button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardComponent)
