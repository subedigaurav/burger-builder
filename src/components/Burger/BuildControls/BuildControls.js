import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
	{
		label: 'Salad',
		type: 'salad',
	},
	{
		label: 'Bacon',
		type: 'bacon',
	},
	{
		label: 'Cheese',
		type: 'cheese',
	},
	{
		label: 'Meat',
		type: 'meat',
	},
];

const buildControls = ({
	price,
	ingredientAdded,
	ingredientRemoved,
	disabled,
	purchasable,
	isAuth,
	ordered,
}) => (
	<div className={styles.BuildControls}>
		<p>
			Current Price: <strong>{price.toFixed(2)}</strong>
		</p>
		{controls.map(ctrl => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => ingredientAdded(ctrl.type)}
				removed={() => ingredientRemoved(ctrl.type)}
				disabled={disabled[ctrl.type]}
			/>
		))}
		<button
			className={styles.OrderButton}
			disabled={!purchasable}
			onClick={ordered}>
			{isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
		</button>
	</div>
);

buildControls.propTypes = {
	price: PropTypes.number,
	ingredientAdded: PropTypes.func,
	ingredientRemoved: PropTypes.func,
	disabled: PropTypes.object,
	purchasable: PropTypes.bool,
	ordered: PropTypes.func,
};

export default buildControls;
