import React, { Component } from 'react';

import Aux from '@hoc/Auxiliary';
import Button from '@components/UI/Button/Button';

class OrderSummary extends Component {
	// This could be a functional component, it doesn't have to be a class
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
					{this.props.ingredients[igKey]}
				</li>
			);
		});

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>Delicious Burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total Price: ${this.props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to Checkout?</p>
				<Button btnType='danger' clicked={this.props.purchaseCanceled}>
					CANCEL
				</Button>
				<Button btnType='success' clicked={this.props.purchaseContinued}>
					CONTINUE
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
