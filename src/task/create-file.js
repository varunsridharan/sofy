import path from "path";
import config from "../app-config";
import fs from "fs";
import { rtrim } from "../helper";
import chalk from "chalk";
import { log, logError, logSuccess } from "../logger";

const _ = require( 'lodash' );
export default function createConfigFile( location, type = 'sofy' ) {
	return new Promise( resolve => {
		location       = ( true === location ) ? './' : location;
		let customfile = false;
		let parsed     = path.parse( location );

		if( _.isUndefined( location ) ) {
			location = `./${config.defaultFileName[ type ]}`;
		} else if( _.isEmpty( parsed.ext ) ) {
			location = rtrim( location, '/' );
			location = `${location}/${config.defaultFileName[ type ]}`;
		} else {
			customfile = ( config.defaultFileName[ type ] === parsed.base ) ? false : true;
		}

		fs.copyFile( `../${config.configTemplates[ type ]}`, location, ( err ) => {
			if( err ) {
				logError( `Unable To Create Config File. Please Check The Provided Location : ${location}` );
				process.exit( 1 );
			}

			logSuccess( `Success File Created` );
			log( chalk.blue( `Location : ${location}` ) );
			let logmsg = '';

			if( 'sofy' === type ) {
				logmsg = `${chalk.dim( `Invoke CMD :` )} node sofy`;
				if( customfile ) {
					logmsg += `${chalk.grey( ` --config "${location}"` )}`;
				}
				logmsg += `${chalk.grey( ' --compile' )}`;
			} else if( 'rollup' === type ) {
				logmsg = `${chalk.dim( `Invoke CMD :` )} rollup -c`;
				logmsg += `${chalk.dim( `Watch CMD :` )} rollup -c --watch`;
				if( customfile ) {
					logmsg += `${chalk.grey( ` --config "${location}"` )}`;
				}
			}

			log( logmsg );
			resolve();
		} );
	} );
}
