import path from "path";
import config from "../app-config";
import fs from "fs";
import { internalPath, rtrim } from "../helper";
import chalk from "chalk";
import { log, logError, logSuccess } from "../logger";

const _ = require( 'lodash' );
export default function createConfigFile( location ) {
	let customfile = false;
	let parsed     = path.parse( location );

	if( _.isUndefined( location ) ) {
		location = `./${config.defaultFileName}`;
	} else if( _.isEmpty( parsed.ext ) ) {
		location = rtrim( location, '/' );
		location = `${location}/${config.defaultFileName}`;
	} else {
		customfile = ( config.defaultFileName === parsed.base ) ? false : true;
	}

	fs.copyFile( internalPath( '../sofy-config.js' ), location, ( err ) => {
		if( err ) {
			logError( `Unable To Create Config File. Please Check The Provided Location : ${location}` );
			process.exit( 1 );
		}

		logSuccess( `Success File Created` );
		log( chalk.blue( `Location : ${location}` ) );

		let logmsg = `${chalk.dim( `Invoke CMD :` )} node sofy`;
		if( customfile ) {
			logmsg += `${chalk.grey( ` --config "${location}"` )}`;
		}
		logmsg += `${chalk.grey( ' --compile' )}`;
		log( logmsg );
		process.exit( 0 );
	} );
}
