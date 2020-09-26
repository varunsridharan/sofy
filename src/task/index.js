import processUserFiles from "./compile";

const _ = require( 'lodash' );

export default function triggerTask( _argument ) {
	if( !_.isUndefined( _argument.compile ) ) {
		processUserFiles();
	}

	if( !_.isUndefined( _argument.watch ) ) {
	}
}
