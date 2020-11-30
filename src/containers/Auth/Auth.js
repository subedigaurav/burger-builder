import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = event => {
    // to prevent the reloading of the page
    event.preventDefault();

    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  };

  // change state between login and signup
  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formElements = [];
  for (let key in authForm) {
    formElements.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = formElements.map(formElement => (
    <Input
      key={formElement.id}
      valuetype={formElement.id}
      label={formElement.config.elementConfig.type}
      elementtype={formElement.config.elementType}
      value={formElement.config.value}
      elementconfig={formElement.config.elementConfig}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errMessage = null;

  if (props.error) {
    errMessage = <p style={{ color: 'red' }}>{props.error.message}</p>;
  }

  // redirect the user to the home page if the user is authenticated
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="danger">
        SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
