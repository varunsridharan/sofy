const gulp = require( 'gulp' );
/**
 * Sofy Module Base Handler.
 * @param $src string
 * @param $config array/object
 */
export default function( $src, $config ) {
	this.src    = $src;
	this.config = $config;
	this.name   = this.src;

	if( typeof this.config.src !== 'undefined' ) {
		this.src = this.config.src;
		delete this.config.src;
	}

	if( typeof this.config.name !== 'undefined' ) {
		this.name = this.config.name;
		delete this.config.name;
	}

	this.instance  = gulp.src( this.src );
	this.timeTaken = false;
}
