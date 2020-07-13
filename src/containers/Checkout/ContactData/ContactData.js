import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

import * as actions from '../../../store/actions/';
import orderForm from './OrderForm';

export class ContactData extends Component {
	state = {
		orderForm, //
		formIsValid: false,
	};

	orderHandler = event => {
		// to prevent the default action like submission of form on button click
		event.preventDefault();

		// retrieve the form data values form the state's values
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		console.log('PROCESSING ORDER...');
		//! send data to backend
		const order = {
			ingredients: this.props.ings,
			price: this.props.price.toFixed(2),
			orderData: formData,
		};

		this.props.onOrderBurger(order, this.props.token );
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		// if no validation rules are defined on the element, treat as valid
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			let regex = /\w+@\w+\.\w{2,4}/;
			isValid = regex.test(value) && isValid;
		}

		return isValid;
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};

		//! alternative method of cloning nested object - 1 level only
		// const updatedFormElement = {
		// 	...updatedOrderForm[inputIdentifier],
		// };

		//! A way of deep cloning objects with the loss of data
		const updatedFormElement = JSON.parse(
			JSON.stringify(updatedOrderForm[inputIdentifier])
		);

		updatedFormElement.value = event.target.value;

		// exclude the validity check for the select element
		if ('valid' in updatedFormElement) {
			updatedFormElement.valid = this.checkValidity(
				updatedFormElement.value,
				updatedFormElement.validation
			);
		}

		//! the user touched the input field
		updatedFormElement.touched = true;

		updatedOrderForm[inputIdentifier] = updatedFormElement;

		// here the anding with isFormValid is done to prevent the only check with the last value
		let isFormValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: isFormValid });
	};

	render() {
		const formElements = [];
		for (let key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElements.map(formElement => (
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
				))}
				<Button
					btnType='success'
					clicked={this.orderHandler}
					disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data.</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
