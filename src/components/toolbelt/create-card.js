import React from 'react';
import {addCard} from '../../actions/cards';

import requiresLogin from '../../requires-login';

export class CreateCard extends React.Component {
  render() {
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
            }
            this.props.dispatch(addCard(card))
            window.location.reload(); 
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

export default requiresLogin()(CreateCard);