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

	this.instance  = gulp.src( this.src );
	this.timeTaken = false;
}
