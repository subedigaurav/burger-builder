import React, { useState, useEffect, useCallback } from "react";
// connect the component to the store
import { useDispatch, useSelector } from "react-redux";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "../../axios-orders";

import * as actions from "../../store/actions/";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  //@ selectors
  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => +state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  //@ dispatch methods
  const dispatch = useDispatch();
  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  //@ the useeffect hook
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  };

  //! to handle the purchase
  const purchaseHandler = () => {
    if (isAuthenticated) {
      // show the modal by setting purchasing to true
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  //! to handle the backdrop click
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  //? to continue the purchase
  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ings,
  };
  // disable the less button if ingredient number -> less than or equal to 0
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
  }

  let orderSummary = null;
  let burger = error ? (
    <p style={{ textAlign: "center" }}>Ingredients can't be loaded!</p>
  ) : (
    <Spinner />
  );

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          isAuth={isAuthenticated}
          ordered={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        purchaseCanceled={purchaseCancelHandler}
        ingredients={ings}
        price={price}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
