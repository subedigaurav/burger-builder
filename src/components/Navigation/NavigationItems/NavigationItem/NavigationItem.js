import React from 'react';

import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = ({ link, exact, children }) => (
	<li className={classes.NavigationItem}>
		<NavLink
			to={link} //
			exact={exact}
			activeClassName={classes.active}>
			{children}
		</NavLink>
	</li>
);

export default navigationItem;
