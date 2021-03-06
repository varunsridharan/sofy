const gulp = require( 'gulp' );
/**
 * Sofy Module Base Handler.
 * @param $src string
 * @param $config array/object
 * @param $type
 */
export default function( $src, $config, $type = 'general' ) {
	this.src    = $src;
	this.config = $config;
	this.name   = this.src;
	this.type   = $type;

	if( typeof this.config.src !== 'undefined' ) {
		this.src = this.config.src;
		delete this.config.src;
	}

	if( typeof this.config.name !== 'undefined' ) {
		this.name = this.config.name;
		delete this.config.name;
	}

	if( 'general' === this.type ) {
		this.instance = gulp.src( this.src );
	}
	this.timeTaken = false;
}
