import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
import '../styles/registration-form.css';
const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
	onSubmit(values) {
		const { password, name, email } = values;
		const user = {
			password,
			name,
			email,
			ambassador: this.props.ambassador
		};
		return this.props
			.dispatch(registerUser(user))
			.then(() => this.props.dispatch(login(email, password)));
	}

	render() {
		return (
			<form
				className="registration-form"
				onSubmit={this.props.handleSubmit(values =>
					this.onSubmit(values)
				)}
			>
				<label htmlFor="name">Full Name</label>
				<Field
					component={Input}
					type="text"
					name="Carmen Sandiego"
					validate={[required, nonEmpty, isTrimmed]}
				/>
				<label htmlFor="email">Email</label>
				<Field
					component={Input}
					type="email"
					name="email@email.com"
					validate={[required, nonEmpty, isTrimmed]}
				/>
				<label htmlFor="password">Password</label>
				<Field
					component={Input}
					type="password"
					name="minimum eight characters"
					validate={[required, passwordLength, isTrimmed]}
				/>
				<label htmlFor="confirm password">Confirm password</label>
				<Field
					component={Input}
					type="password"
					name="confirm password"
					validate={[required, nonEmpty, matchesPassword]}
				/>
				<button type="submit">Register</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
