const path   = require( 'path' );
const config = {
	'defaultFileName': {
		sofy: 'sofy.js',
		rollup: 'rollup.config.js',
		npm: 'package.json',
		babel: '.babelrc',
		babeljs: 'babel.config.js',
	},
	'configTemplates': {
		sofy: 'config-templates/sofy.js',
		rollup: 'config-templates/rollup.js',
		npm: 'config-templates/npm.json',
		babel: 'config-templates/babel-rc',
		babeljs: 'config-templates/babel.config.js',
	},
	'icon': {
		'success': path.join( __dirname, '/../resources/icon/success.png' ),
		'error': path.join( __dirname, '/../resources/icon/error.png' ),
	},
	sound: false,
};
export default config;
