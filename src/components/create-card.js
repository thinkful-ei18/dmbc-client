import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty} from '../validators';
import {addCard} from '../actions/cards';

import requiresLogin from '../requires-login';

export class CreateCard extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(addCard(values));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }

    return (
      <div className="login-form">
        <form
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
          )}>
          <h4>Create a Card</h4>
          {error}
          <label htmlFor="name">Name</label>
          <Field
            component="input"
            type="text"
            name="name"
            id="name"
            placeholder="name"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="description">Description</label>
          <Field
            component="input"
            type="textarea"
            name="description"
            id="description"
            placeholder="description"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="address">Address</label>
          <Field
            component="input"
            type="textarea"
            name="address"
            id="address"
            placeholder="address"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="hours">Hours</label>
          <Field
            component="input"
            type="textarea"
            name="hours"
            id="hours"
            placeholder="hours"
            validate={[required, nonEmpty]}
          />
          <button>Create</button>
        </form>
      </div>
    );
  }
}

export default requiresLogin()(reduxForm({
  form: 'create-card',
  onSubmitFail: (errors, dispatch) => dispatch(focus('create-card', 'name'))
})(CreateCard));