const rtrim = require( 'lodash/trimEnd' );

export const cwd = rtrim( process.cwd(), '/' ) + '/';

export function internalPath( x ) {
	return `${cwd}/lib/${x}`;
}

export function getFormattedTime() {
	let date = new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export { rtrim };
