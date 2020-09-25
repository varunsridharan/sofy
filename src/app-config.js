const path   = require( 'path' );
const config = {
	'defaultFileName': 'sofy.js',
	'icon': {
		'success': path.join( __dirname, '/../resources/icon/success.png' ),
		'error': path.join( __dirname, '/../resources/icon/error.png' ),
	},
	sound: false,
};

export default config;
