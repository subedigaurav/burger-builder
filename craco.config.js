const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@hoc': path.resolve(__dirname, 'src/hoc'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@images': path.resolve(__dirname, 'src/assets/images'),
			'@ui': path.resolve(__dirname, 'src/components/UI'),
		},
	},
	jest: {
		configure: {
			moduleNameMapper: {
				'^@(.*)$': '<rootDir>/src$1',
			},
		},
	},
};
