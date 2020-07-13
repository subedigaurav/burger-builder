const orderForm = {
	name: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Your Name',
		},
		value: '',
		validation: {
			required: true,
			minLength: 5,
		},
		valid: false,
		touched: false,
	},
	street: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Street',
		},
		value: '',
		validation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	zipCode: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'ZIP Code',
		},
		value: '',
		validation: {
			required: true,
			minLength: 5,
			maxLength: 5,
		},
		valid: false,
		touched: false,
	},
	country: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Country',
		},
		value: '',
		validation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	email: {
		elementType: 'input',
		elementConfig: {
			type: 'email',
			placeholder: 'Your E-Mail',
		},
		value: '',
		validation: {
			required: true,
			isEmail: true,
		},
		valid: false,
		touched: false,
	},
	deliveryMethod: {
		elementType: 'select',
		elementConfig: {
			options: [
				{
					value: 'fastest',
					displayValue: 'Fastest',
				},
				{
					value: 'cheapest',
					displayValue: 'Cheapest',
				},
			],
		},
		validation: {},
		value: 'fastest',
		valid: true,
	},
};

export default orderForm;
