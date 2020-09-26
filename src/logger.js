import chalk from "chalk";
import { getFormattedTime } from "./helper";

const nxtLine = `
`;

export function log( x ) {
	console.log( x );
}

export function logError( x ) {
	log( chalk.redBright( x ) );
}

export function logSuccess( x ) {
	log( chalk.green( x ) );
}

export function logBreak() {
	log( nxtLine );
}

/*export function logBannerError( x ) {
	log( `${chalk.bgRedBright.bold.whiteBright( 'Error :' )} ${x}` );
}*/

export function logHeader( x ) {
	log( `   > ${chalk.rgb( 38, 38, 38 )( `${x}` )}` );
}

export function logSuccessHeader( x ) {
	log( `* ${chalk.bgGreenBright.blackBright( `${x}` )}` );
}

export function logFileHeader( x ) {
	log( `Using File : ${chalk.bgBlueBright.whiteBright( `${x}` )}` );
}

export function logProcessStart( x, processName = 'Starting' ) {
	log( `[${chalk.yellow( getFormattedTime() )}] ${chalk.magenta( processName )} ${chalk.black( `'${x}'` )}` );
}

export function logProcessEnd( src, time ) {
	log( `[${chalk.yellow( getFormattedTime() )}] ${chalk.magenta( 'Finished' )} ${chalk.black( `'${src}'` )} ${chalk.magenta( 'after' )} ${chalk.yellow( time )} ${chalk.magenta( 'ms' )} ${nxtLine}` );
}
