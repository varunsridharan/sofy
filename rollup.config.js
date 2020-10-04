import babel from '@rollup/plugin-babel';

export default {
	input: './src/cli.js',
	output: {
		file: './lib/sofy.js',
		format: 'cjs',
	},
	plugins: [
		babel( {
			exclude: 'node_modules/**'
		} )
	]
};
