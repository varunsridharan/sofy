import ModuleHandler from "../modules/index";
import { getUserConfig } from "../helpers/config-handler";
import config from "../app-config";

const _        = require( 'lodash' );
const notifier = require( 'node-notifier' );
let notifyID   = 0;

export function initSingleFile( src, data, type = 'general' ) {
	return new Promise( resolve => {
		let $ins = new ModuleHandler( src, data, type );
		$ins.run().then( ( reason ) => {
			notifier.notify( {
				title: `Wooofff. Success`,
				message: `${reason.instance.name} File Successfully Processed`,
				sound: config.sound,
				appID: 'Sofy',
				icon: config.icon.success,
				id: notifyID++,
			} );
		} ).catch( reason => {
			notifier.notify( {
				title: `Woff !! Error Occured.`,
				message: `Unable To Process ${reason.instance.name} Please Check Terminal For Logs`,
				sound: config.sound,
				appID: 'Sofy',
				icon: config.icon.error,
				id: notifyID++,
			} );
			console.log( reason.msg );
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
	let $userConig = getUserConfig();
	let $files     = $userConig.files;

	if( !_.isEmpty( $files ) && _.isObject( $files ) ) {
		for( let $id in $files ) {
			if( _.isArray( $files[ $id ] ) ) {
				await processArrayofUserFiles( $id, $files[ $id ] );
			} else {
				await initSingleFile( $id, $files[ $id ] );
			}
		}
	}
}
