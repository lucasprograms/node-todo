import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
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

  render() {
    return (
      <div className="add-card-component">
        <span className="prompt">Add a Card</span>

        <form onSubmit={((e) => this.submitNewCard(e))}>
          <input type="text" value={this.state.newCardText} onChange={(e) => this.updateNewCardText(e) } />
          <button><FontAwesome name='rocket' size='3x' /></button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardComponent)
