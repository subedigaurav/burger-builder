import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingName,
});

export const removeIngredient = (ingName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingName,
});

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => (dispatch) => {
  // asynchronous code
  axios
    .get('https://react-burger-builder-95ffe.firebaseio.com/ingredients.json')
    .then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch((error) => {
      dispatch(fetchIngredientsFailed());
    });
};
