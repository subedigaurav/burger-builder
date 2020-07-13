import React, { Component } from 'react';
import Layout from '@hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route } from 'react-router-dom';

import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/auth' component={Auth} />
					<Route path='/logout' component={Logout} />
					<Route path='/' exact component={BurgerBuilder} />
					{/* for 404 error */}
					<Route
						render={() => (
							<h1 style={{ textAlign: 'center', color: 'grey' }}>
								It's an error. That's all I know.
							</h1>
						)}
					/>
				</Switch>
			</Layout>
		);
	}
}

export default App;
