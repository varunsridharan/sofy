const files = {
	'./src/style/main.scss': [
		{
			scss: true,
			dist: './dist/css/',
			watch: true,
		},
		{
			scss: true,
			autoprefixer: true,
			minify: true,
			watch: true,
			rename: 'main.pio.css',
			dist: './dist/css/'
		}
	],

	'babelJS': {
		src: './src/js/babel/index.js',
		babel: true,
		watch: true,
		dist: './dist/js/babel/'
	},
	'combineFiles': {
		src: './src/js/combine/combine.js',
		combine_files: true,
		watch: true,
		dist: './dist/js/combine/',
	},
	'./src/js/concat/*.js': {
		dist: 'dist/js',
		concat: 'concat.js',
		watch: true,
		rename: 'concat.js',
	},
	'./src/js/webpack/index.js': {
		dist: 'dist/js/webpack/',
		webpack: true,
		uglify: true,
		watch: true,
		rename: 'webpack.js',
	},
	'pluginsCSS': {
		src: './src/style/m2.scss',
		scss: { outputStyle: 'compressed' },
		dist: './dist/css/',
		watch: true,
	},
};

module.exports = {
	files: files,
	config: {}
};

