import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  // redirect when there is no ingredients
  let summary = <Redirect to="/" />;

  if (props.ings) {
    // redirect once the user has purchased the burger
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings || {}}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.url + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
