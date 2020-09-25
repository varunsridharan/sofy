import ModuleHandler from "../modules/index";
import { getUserConfig } from "../helpers/config-handler";

const _ = require( 'lodash' );

function initSingleFile( src, data ) {
	return new Promise( resolve => {
		let $ins = new ModuleHandler( src, data );
		$ins.run().catch( reason => {
			console.error( reason );
		} ).finally( () => {
			resolve();
		} );
	} );
}

function processArrayofUserFiles( src, data ) {
	return new Promise( resolve => {
		let current = data.shift();
		if( !_.isUndefined( current ) && _.isObject( current ) ) {
			initSingleFile( src, current ).then( () => {
				if( !_.isEmpty( data ) && _.isArray( data ) ) {
					return processArrayofUserFiles( src, data );
				}
			} ).then( () => {
				return resolve();
			} );
		}
	} );
}

export default async function processUserFiles() {
	let $files = getUserConfig().files;

	for( let $id in $files ) {
		if( _.isArray( $files[ $id ] ) ) {
			await processArrayofUserFiles( $id, $files[ $id ] );
		} else {
			await initSingleFile( $id, $files[ $id ] );
		}
	}
}
