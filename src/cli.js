import createConfigFile from "./task/create-file";
import commander from "commander";
import { validateConfigFile } from "./helpers/config-handler";
import triggerTask from "./task/index";
import config from "./app-config";

const _ = require( 'lodash' );
export default function sofy() {
	const pkg     = require( '../package.json' );
	const program = new commander.Command();

	program.version( pkg.version );
	program
		.option( '-c, --config [location]', 'Custom Location For Config File', './sofy.js' )
		.option( '--compile', 'Triggers Build For All Files Listed In Config File' )
		.option( '--watch', 'Watches For Files For Updates & Triggers Process.' )
		.option( '--create [configType...]', 'Creates Sofy\'s Config file' )
		.parse( process.argv );

	if( !_.isUndefined( program.create ) ) {
		let create   = ( true === program.create ) ? [] : program.create;
		let location = create[ 1 ] || true;
		let type     = create[ 0 ] || 'sofy';

		if( 'all' === type ) {
			for( let id in config.configTemplates ) {
				createConfigFile( location, id );
			}
		} else {
			createConfigFile( location, type );
		}
	} else {
		validateConfigFile( program.config );
		triggerTask( program );
	}

}
