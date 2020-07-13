// action creators for submitting the orders
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const purchaseBurgerFailed = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		// dispatch the sync code to set the loading state to true and then make async call
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json?auth=' + token, orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
				console.log('ORDER PLACED SUCCESSFULLY...');
			})
			.catch(error => {
				dispatch(purchaseBurgerFailed(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersFailed = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error: error,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = token => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios
			.get('/orders.json?auth=' + token)
			.then(res => {
				// you can do data format changes in reducer also
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFailed(err));
			});
	};
};
