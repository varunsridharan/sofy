const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

const files = {
	/*'./src/style/main.scss': [
		{
			scss: true,
			dist: './dist/css/'
		},
		{
			scss: true,
			autoprefixer: true,
			minify: true,
			rename: 'main.pio.css',
			dist: './dist/css/'
		}
	],

	'babelJS': {
		src: './src/js/babel/index.js',
		babel: true,
		dist: './dist/js/babel/'
	},
	'combineFiles': {
		src: './src/js/combine/combine.js',
		combine_files: true,
		dist: './dist/js/combine/',
	},
	'./src/js/concat/!*.js': {
		dist: 'dist/js',
		concat: 'concat.js',
		rename: 'concat.js',
	},*/
	'./src/js/webpack/index.js': {
		dist: 'dist/js/webpack/',
		webpack: true,
		uglify: true,
		rename: 'webpack.js',
	},
	'pluginsCSS': {
		src: './src/style/m2.scss',
		scss: { outputStyle: 'compressed' },
		dist: './dist/css/'
	},
};

module.exports = {
	files: files,
	config: {}
};

