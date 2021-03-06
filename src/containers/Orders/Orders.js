import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
  const { onFetchOrders, token, userId } = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [token, userId, onFetchOrders]);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order //
        key={order.id}
        id={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }

  return <div>{orders}</div>;
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) =>
    dispatch(actions.fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
