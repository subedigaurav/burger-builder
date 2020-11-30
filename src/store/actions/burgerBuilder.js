import * as actionTypes from './actionTypes';

export const addIngredient = ingName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingName,
});

export const removeIngredient = ingName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingName,
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => {
  return { type: actionTypes.INIT_INGREDIENTS };
};
