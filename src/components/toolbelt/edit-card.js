import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchSingleCard, updateCard} from '../../actions/cards';
import requiresLogin from '../../requires-login';

class SingleCard extends React.Component {
  constructor() {
    super();

    this.state = {
      name: null,
      description: null,
      address: null,
      hours: null,
      id: null,
      finished: false
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchSingleCard(this.props.match.params.id))
    .then(() => {
      this.setState({
        name: this.props.singleCard.name,
        description: this.props.singleCard.description,
        address: this.props.singleCard.address,
        hours: this.props.singleCard.hours,
        id: this.props.singleCard.id
      })
    });
  };
  render() {
    let {finished} = this.state;

    let editForm;
    if (this.state.id) {
      let newCard = {
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        hours: this.state.hours,
        id: this.state.id,
        ambassador: this.props.singleCard.ambassador
      }
      editForm = (
        <form onSubmit={event => {
          event.preventDefault();
          this.props.dispatch(updateCard(newCard, this.state.id))
          .then(() => {
            this.setState({
              finished: true
            })
          });
        }}>
          <label htmlFor="name">Name</label>
          <input 
            id="name"
            name="name"
            defaultValue={this.state.name}
            onChange={event => {
              event.preventDefault();
              this.setState({
                name: event.target.value
              })
            }}
          />
          <label htmlFor="description">Description</label>
          <textarea 
            id="description"
            name="description"
            defaultValue={this.state.description}
            onChange={event => {
              event.preventDefault();
              this.setState({
                description: event.target.value
              })
            }}
          />
          <label htmlFor="address">Address</label>
          <input 
            id="address"
            name="address"
            defaultValue={this.state.address}
            onChange={event => {
              event.preventDefault();
              this.setState({
                address: event.target.value
              })
            }}
          />
          <label htmlFor="hours">Hours</label>
          <input 
            id="hours"
            name="hours"
            defaultValue={this.state.hours}
            onChange={event => {
              event.preventDefault();
              this.setState({
                hours: event.target.value
              })
            }}
          />
          <button>Submit Changes</button>
        </form>
      );
    }
    return (
      <div>
        {editForm}
        {finished && (
          <Redirect to="/cards"/>
        )}
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