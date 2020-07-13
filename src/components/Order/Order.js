import React from 'react';
import classes from './Order.module.css';

export const Order = ({ id, ingredients, price }) => {
	// let transformedIngredients = Object.keys(ingredients).map((ing, index) => (
	// 	<p key={ing + index}>
	// 		{ing.toUpperCase()}: {ingredients[ing]}
	// 	</p>
	// ));

	const igArray = [];

	for (let ingredientName in ingredients) {
		igArray.push({
			name: ingredientName,
			amount: ingredients[ingredientName],
		});
	}

	const ingredientOutput = igArray.map(ig => {
		return (
			<span //
				key={ig.name}
				className={classes.ingredients}>
				&nbsp;
				{ig.name} ({ig.amount})
			</span>
		);
	});

	return (
		<div className={classes.Order}>
			<p>
				ORDER ID: <strong>{id}</strong>
			</p>
			<hr />
			<div>
				<strong>Ingredients:</strong>
				{ingredientOutput}
			</div>
			<p>
				PRICE: <strong>USD {price}</strong>
			</p>
		</div>
	);
};

export default Order;
