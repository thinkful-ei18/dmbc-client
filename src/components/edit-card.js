import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleCard} from '../actions/cards';
import requiresLogin from '../requires-login';

class SingleCard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleCard(this.props.match.params.id));
    };
    render() {
      console.log(this.props.singleCard)
      return (
        <div>
          Hello
        </div>
      )
  }
}

const mapStateToProps = state => ({
  singleCard: state.cards.singleCard,
  loading: state.cards.loading,
  error: state.cards.error
});

export default requiresLogin()(connect(mapStateToProps)(SingleCard));