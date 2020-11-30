import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../../components/UI/Button/Button';

const OrderSummary = props => {
  // This could be a functional component, it doesn't have to be a class
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
      {props.ingredients[igKey]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Delicious Burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
