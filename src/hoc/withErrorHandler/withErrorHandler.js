import React, { Component } from 'react';

import Modal from '@ui/Modal';
import Aux from '@hoc/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		setInterceptors = () => {
			// clear error on every request from the burger builder
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});

			this.resInterceptor = axios.interceptors.response.use(null, error => {
				this.setState({ error: error });
			});
		};

		UNSAFE_componentWillMount() {
			this.setInterceptors();
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.request.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Aux>
					<Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
