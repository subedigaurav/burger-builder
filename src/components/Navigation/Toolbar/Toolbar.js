import React from 'react';

import Logo from '../../../components/Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const toolbar = ({ isAuth, click }) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={click} />

    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={isAuth} />
    </nav>
  </header>
);

export default toolbar;
