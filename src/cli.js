import createConfigFile from "./task/create-file";
import commander from "commander";
import { validateConfigFile } from "./helpers/config-handler";
import triggerTask from "./task/index";

const _ = require( 'lodash' );
export default function sofy() {
	const pkg     = require( '../package.json' );
	const program = new commander.Command();

	program.version( pkg.version );
	program
		.option( '-c, --config [location]', 'Custom Location For Config File', './sofy.js' )
		.option( '--compile', 'Triggers Build For All Files Listed In Config File' )
		.option( '--watch', 'Watches For Files For Updates & Triggers Process.' )
		.option( '--create [location]', 'Creates Sofy\'s Config file' )
		.option( '--rollup [location]', 'Creates Rollups\' Config File' )
		.option( '--npm [location]', 'Creates NPM Config File' )
		.parse( process.argv );

	if( !_.isUndefined( program.create ) ) {
		createConfigFile( program.create, 'sofy' );
	} else if( !_.isUndefined( program.rollup ) ) {
		createConfigFile( program.rollup, 'rollup' );
	} else if( !_.isUndefined( program.npm ) ) {
		createConfigFile( program.npm, 'npm' );
	} else {
		validateConfigFile( program.config );
		triggerTask( program );
	}

}
