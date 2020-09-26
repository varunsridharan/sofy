import { getUserConfig } from "../helpers/config-handler";
import { initSingleFile } from "./compile";

const { watch } = require( 'gulp' );
const _         = require( 'lodash' );

function handleSingleWatch( $_src, $file ) {
	let $src   = ( !_.isUndefined( $file.src ) ) ? $file.src : $_src;
	let $watch = ( !_.isUndefined( $file.watch ) && false !== $file.watch ) ? $file.watch : false;
	$watch     = ( true === $watch ) ? $src : $watch;
	if( false !== $watch ) {
		watch( $watch, { queue: true }, function( cb ) {
			// body omitted
			initSingleFile( $src, $file ).finally( () => cb() );
		} );
	}
}

export default function() {
	let $userConig = getUserConfig();
	let $files     = $userConig.files;

	if( !_.isEmpty( $files ) && _.isObject( $files ) ) {
		for( let $id in $files ) {
			if( _.isArray( $files[ $id ] ) ) {
				for( let $_id in $files[ $id ] ) {
					handleSingleWatch( $id, $files[ $id ][ $_id ] );
				}
			} else {
				handleSingleWatch( $id, $files[ $id ] );
			}
		}
	}
}
