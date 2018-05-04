import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import {Redirect} from 'react-router-dom';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.email, values.password));
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    
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
          <h4>Sign in to your account</h4>
          {error}
          <label htmlFor="email">Email</label>
          <Field
            component="input"
            type="text"
            name="email"
            id="email"
            placeholder="email"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="password">Password</label>
          <Field
            component="input"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            validate={[required, nonEmpty]}
          />
          <button>
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm);