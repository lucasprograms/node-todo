import { connect } from 'react-redux'
import Card from './Card'
import { deleteCard } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteClickHandler () {
    dispatch(deleteCard(ownProps._id))
  }
})

const mapStateToProps = (state, ownProps) => ({
  text: ownProps.text
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)

