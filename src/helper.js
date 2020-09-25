import chalk from "chalk";

const rtrim = require( 'lodash/trimEnd' );

export const cwd = rtrim( process.cwd(), '/' ) + '/';

export function internalPath( x ) {
	return `${cwd}/lib/${x}`;
}

export function log( x ) {
	console.log( x );
}

export function logError( x ) {
	log( chalk.redBright( x ) );
}

export function logSuccess( x ) {
	log( chalk.green( x ) );
}

export function logHeader( x ) {
	log( chalk.bgBlackBright.whiteBright( ` ${x} ` ) );
}

export function getFormattedTime() {
	let date = new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export { rtrim };
