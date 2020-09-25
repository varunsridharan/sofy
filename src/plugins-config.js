//const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );

let config = {};

config.concat = { newline: ';' };

config.uglify = true;

config.babel = {
	presets: [
		[ '@babel/env', { loose: true, useBuiltIns: false } ]
	],
	compact: false
};

config.combine_files = {
	append: 'sofy-append',
	prepend: 'sofy-prepend',
	inline: 'sofy-inline',
};

config.scss = {
	outputStyle: 'expanded'
};

config.autoprefixer = {
	overrideBrowserslist: [ 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ],
	cascade: false
};

config.minify = { options: {}, callback: {} };

config.webpack = {
	mode: 'production',
	output: { filename: '[name].js' },
	target: 'node',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: config.babel,
			}
		]
	},
};

config.webpack_dev = {
	devtool: 'source-map',
	mode: 'development',
	//plugins: [ new UglifyJsPlugin() ],
	target: 'node',
	externals: { jquery: 'jQuery' },
	output: { filename: '[name].js' },
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: config.babel,
			}
		]
	},
};

export default config;
