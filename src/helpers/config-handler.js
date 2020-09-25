import fs from "fs";
import path from "path";
import config from "../app-config";
import defaultConfigData from "../plugins-config";
import { cwd, logError, rtrim } from "../helper";

const _ = require( 'lodash' );

let currentConfigFile = false;
let userConfigData    = false;
let globalConfigData  = false;

/**
 * Validates Config File Location. Based on users Input.
 * @param location
 * @return {boolean}
 */
export function validateConfigFile( location ) {
	let currentFile = false;


	if( _.isUndefined( location ) || false !== location ) {
		let parsed = path.parse( location );
		if( !_.isEmpty( parsed.ext ) && '.js' === parsed.ext ) {
			currentFile = validateCustomConfigLocation( `${rtrim( location, '/' )}` );
		} else {
			currentFile = validateCustomConfigLocation( `${rtrim( location, '/' )}/${config.defaultFileName}` );
		}

	}

	// Validates With Default Location
	if( !currentFile ) {
		try {
			currentFile = ( fs.existsSync( `./${config.defaultFileName}` ) ) ? `./${config.defaultFileName}` : false;
		} catch( e ) {
			currentFile = false;
		}
	}

	if( !currentFile ) {
		logError( 'Config File Not Found. Please Check `--config / -c` argument. make sure you have sofy.js in our project root ' );
		process.exit( 5 );
	}
	currentConfigFile = currentFile;
	return currentConfigFile;
}

/**
 * Checks if file exists.
 * @param location
 * @return {boolean|*}
 */
export function validateCustomConfigLocation( location ) {
	try {
		return ( fs.existsSync( location ) ) ? location : false;
	} catch( e ) {
		return false;
	}
}

/**
 * Fetches User Config Data From The Config File.
 * @return {boolean}
 */
export function getUserConfig() {
	if( false === userConfigData ) {
		userConfigData = require( `${cwd}${currentConfigFile}` );
	}
	return userConfigData;
}

/**
 * Merges All Config Into 1 And Provides Option To Fetch It.
 *
 * @return {*|boolean}
 */
export function getAddonConfig() {
	if( false === globalConfigData ) {
		if( !_.isUndefined( getUserConfig().config ) ) {
			globalConfigData = _.merge( defaultConfigData, getUserConfig().config );
		} else {
			globalConfigData = defaultConfigData;
		}
	}
	return globalConfigData;
}
