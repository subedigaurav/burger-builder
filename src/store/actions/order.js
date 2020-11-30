// action creators for submitting the orders
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFailed = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token,
  };
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFailed = error => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId,
  };
};
