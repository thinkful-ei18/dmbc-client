import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty} from '../validators';
import {addCard} from '../actions/cards';

import requiresLogin from '../requires-login';
import Input from './input';
import TextArea from './textarea';

export class CreateCard extends React.Component {
  onSubmit(values) {
    window.location.reload(); 
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
      <div className="create-card-form">
        <form
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
          )}>
          <h4>Create a Card</h4>
          {error}
          <label htmlFor="name">Name</label>
          <Field
            component={Input}
            type="text"
            name="name"
            id="name"
            info={this.props.name}
            validate={[required, nonEmpty]}
          />
          <label htmlFor="description">Description</label>
          <Field
            component={TextArea}
            name="description"
            id="description"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="address">Address</label>
          <Field
            component={Input}
            type="text"
            name="address"
            id="address"
            info={this.props.location}
            validate={[required, nonEmpty]}
          />
          <label htmlFor="hours">Hours</label>
          <Field
            component={Input}
            type="text"
            name="hours"
            id="hours"
            info="something"
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