import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignUp: true,
	};

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			}),
		});
		this.setState({ controls: updatedControls });
	};

	submitHandler = event => {
		// to prevent the reloading of the page
		event.preventDefault();

		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	// change state between login and signup
	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				isSignUp: !prevState.isSignUp,
			};
		});
	};

	render() {
		const formElements = [];
		for (let key in this.state.controls) {
			formElements.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElements.map(formElement => (
			<Input
				key={formElement.id}
				valuetype={formElement.id}
				elementtype={formElement.config.elementType}
				value={formElement.config.value}
				elementconfig={formElement.config.elementConfig}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={event => this.inputChangedHandler(event, formElement.id)}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errMessage = null;

		if (this.props.error) {
			errMessage = <p style={{ color: 'red' }}>{this.props.error.message}</p>;
		}

		// redirect the user to the home page if the user is authenticated
		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType='success'>SUBMIT</Button>
				</form>
				<Button clicked={this.switchAuthModeHandler} btnType='danger'>
					SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
