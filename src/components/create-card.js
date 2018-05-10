import React from 'react';
import {connect} from 'react-redux';


import {addCard} from '../actions/cards';
import requiresLogin from '../requires-login';
import { setToolbeltDisplay } from '../actions/dashboard';


export class CreateCard extends React.Component {
  render() {
    const distance = this.props.destination.distance;
    return (
      <div className="create-card-form">
        <form
          onSubmit={event => {
            event.preventDefault();
            let card = {
              name: this.name.value,
              address: this.address.value,
              description: this.description.value,
              hours: this.hours.value,
              latitude: this.props.latitude,
              longitude: this.props.longitude
            };
            this.props.dispatch(addCard(card, distance))
            this.props.dispatch(setToolbeltDisplay('cards'));
          }}>
          <h4>Create a Card</h4>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={this.props.name}
            ref={input => this.name = input}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="description"
            required
            ref={input => this.description = input}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            defaultValue={this.props.location}
            ref={input => this.address = input}
          />
          <label htmlFor="hours">Hours</label>
          <input
            type="text"
            name="hours"
            id="hours"
            defaultValue="something"
            ref={input => this.hours = input}
          />
          <button>Create</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.cards.loading,
  error: state.cards.error,
  destination:state.dashboard.currentItinerary.destination
});

export default requiresLogin()(connect(mapStateToProps)(CreateCard));