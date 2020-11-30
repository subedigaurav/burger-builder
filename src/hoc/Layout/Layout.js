import React, { useState } from 'react';
import Aux from '../../hoc/Auxiliary';
import { connect } from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer';

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuthenticated} click={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
