import React from 'react';

import Logo from '@components/Logo';
import NavigationItems from '@components/Navigation/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '@ui/Backdrop/Backdrop';
import Aux from '@hoc/Auxiliary';

const sideDrawer = ({ isAuth, open, closed }) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<Aux>
			<Backdrop show={open} clicked={closed} />
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>

				<nav>
					<NavigationItems isAuthenticated={isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;
