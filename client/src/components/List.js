import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import flow from 'lodash.flow'
import '../styles/list.css'
import CardContainer from './CardContainer'
import AddCardComponent from './AddCardComponent'

const mapStateToProps = (state) => {
  return { cards: state.cards.items }
}

class List extends Component {
  state = {
    showAddCardComponent: false
  }

  static defaultProps = {
    cards: { items: [] }
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }))
  }

  hideAddCardComponenet () {
    this.setState({
      showAddCardComponent: false
    })
  }

  showAddCardComponent () {
    this.setState({
      showAddCardComponent: true
    })
  }

  render() {
    const { cards, children } = this.props

    const sortByOrdinalValue = (a, b) => {
      if (a.ordinalValue > b.ordinalValue) {
        return 1
      } else {
        return -1
      }
    }

    return (
      <div className="list">
        <ul>
          {cards
            .sort(sortByOrdinalValue)
            .map(card => <CardContainer key={card._id} {...card} />)}
        </ul>
        <div className="list__add-card">
          <div className="list__add-card__prompt"
            style={{display: this.state.showAddCardComponent ? 'none' : 'block '}}
            onClick={() => this.showAddCardComponent()}
          >
            Add a card..
          </div>
          <div style={{display: this.state.showAddCardComponent ? 'block' : 'none' }}>
            <AddCardComponent closeButtonClickHandler={() => this.hideAddCardComponenet()} />
          </div>
        </div>
      </div>
    );
  }
};

export default flow([
  connect(mapStateToProps),
])(List)
