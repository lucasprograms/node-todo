import { connect } from 'react-redux'
import Card from './Card'
import { deleteCard, swapOrdinalValues } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteClickHandler () {
    dispatch(deleteCard(ownProps._id))
  },
  swapOrdinalValues (ids) {
    dispatch(swapOrdinalValues(ids))
  }
})

const mapStateToProps = (state, ownProps) => ({
  text: ownProps.text
})

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(Card)
