import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

import * as actions from '../../../store/actions/';
import order_form from './OrderForm';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState(order_form);
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    // to prevent the default action like submission of form on button click
    event.preventDefault();

    // retrieve the form data values form the state's values
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    //! send data to backend
    const order = {
      ingredients: props.ings,
      price: props.price.toFixed(2),
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    //! alternative method of cloning nested object - 1 level only
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    // here the anding with isFormValid is done to prevent the only check with the last value
    let isFormValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(isFormValid);
  };

  const formElements = [];
  for (let key in orderForm) {
    formElements.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
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
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="success" clicked={orderHandler} disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data.</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
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
