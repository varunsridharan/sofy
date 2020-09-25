import ModuleHandler from "./base";
import "./modules";
import { cwd, getFormattedTime, log, logError, rtrim } from "../helper";
import chalk from "chalk";
import { getAddonConfig } from "../helpers/config-handler";

/**
 * Gulp Related
 */
const { dest }      = require( 'gulp' );
const $rename       = require( 'gulp-rename' );
const through       = require( 'through2' );
const _             = require( 'lodash' );
const fn            = ModuleHandler.prototype;
const excludeModule = [ 'dist', 'log', 'pipresolve' ];
const nxtLine       = `
`;

fn.log = {
	section: () => log( nxtLine ),

	plain: ( x ) => log( `${x}` ),

	error: ( x ) => log( `${chalk.bgRedBright.bold.whiteBright( 'Error :' )} ${x}` ),

	header: ( x ) => log( `   > ${chalk.rgb( 38, 38, 38 )( `${x}` )}` ),

	successHeader: ( x ) => log( `* ${chalk.bgGreenBright.blackBright( `${x}` )}` ),

	fileHeader: ( x ) => log( `Using File : ${chalk.bgBlueBright.whiteBright( `${x}` )}` ),

	processStart: ( x ) => log( `[${chalk.yellow( getFormattedTime() )}] ${chalk.magenta( 'Starting' )} ${chalk.black( `'${x}'` )}` ),

	processEnd: ( src, time ) => {
		log( `[${chalk.yellow( getFormattedTime() )}] ${chalk.magenta( 'Finished' )} ${chalk.black( `'${src}'` )} ${chalk.magenta( 'after' )} ${chalk.yellow( time )} ${chalk.magenta( 'ms' )} ${nxtLine}` );
	},
};

fn.getConfig = function( type, userConfig ) {
	let global_config = getAddonConfig();
	if( !_.isUndefined( global_config[ type ] ) ) {
		userConfig = ( true === userConfig ) ? {} : userConfig;

		if( _.isString( userConfig ) ) {
			return ( !_.isUndefined( global_config[ userConfig ] ) ) ? global_config[ userConfig ] : userConfig;
		} else {
			let $global_config = global_config[ type ];
			return _.merge( $global_config, userConfig );
		}
	}
	return ( true === userConfig ) ? null : userConfig;
};

fn.pipresolve = function( resolve ) {
	this.instance = this.instance.pipe( through.obj( ( chunk, enc, cb ) => {
		resolve( this );
		cb( null, chunk );
	} ) );
};

fn.save = function() {
	return new Promise( resolve => {

		if( !_.isUndefined( this.config.rename ) ) {
			this.instance = this.instance.pipe( $rename( this.config.rename ) );
		}

		this.instance = this.instance.pipe( dest( `${cwd}${this.config.dist}` ) );

		this.instance.on( 'end', () => {
			if( !_.isUndefined( this.config.rename ) ) {
				resolve( `${rtrim( this.config.dist, '/' )}/${this.config.rename}` );
			} else {
				resolve( `${rtrim( this.config.dist, '/' )}` );
			}

		} );
	} );
};

fn.timer = function() {
	if( false === this.timeTaken ) {
		this.timeTaken = +new Date();
	} else {
		return +new Date() - this.timeTaken;
	}
};

fn.run = function() {
	return new Promise( ( resolve, reject ) => {
		( async() => {
			this.timer();
			this.log.processStart( this.name );

			for( let $id in this.config ) {
				if( false === this.config[ $id ] ) {
					continue;
				}
				if( !_.isUndefined( this[ $id ] ) ) {
					await this[ $id ]( this.getConfig( $id, this.config[ $id ] ) ).catch( reason => reject(reason) );
				} else if( !$id in excludeModule ) {
					logError( `Module Error : ${chalk.blue( $id )} Not Found In Sofy Builder !!` );
				}
			}

			let place = await this.save();
			this.log.plain( `   ✔ Compiled & Saved In ${chalk.green( place )}` );
			this.log.processEnd( this.name, this.timer() );
			resolve();
		} )();
	} );
}

export default ModuleHandler;

