import babel from 'rollup-plugin-babel';
import run from '@rollup/plugin-run';

export default {
	input: './src/cli.js',
	output: {
		file: './lib/sofy.js',
		format: 'cjs',
	},
	plugins: [
		babel( {
			exclude: 'node_modules/**'
		} ),
		run(),
	]
};
