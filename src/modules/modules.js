import ModuleHandler from "./base";
import { logError, logHeader } from "../logger";

const gulp           = require( 'gulp' );
const sass           = require( 'gulp-sass' );
const $minify_css    = require( 'gulp-clean-css' );
const $autoprefixer  = require( 'gulp-autoprefixer' );
const $babel         = require( 'gulp-babel' );
const $uglify        = require( 'gulp-uglify' );
const $combine_files = require( 'gulp-combine-files' );
const $concat        = require( 'gulp-concat' );
const $webpack       = require( 'webpack-stream' );
const $revert_path   = require( 'gulp-revert-path' );
const $named         = require( 'vinyl-named' );

/**
 * Sass / scss Compiler
 * @param config
 * @return {Promise<unknown>}
 */
ModuleHandler.prototype.scss = function( config = {} ) {
	return new Promise( resolve => {
		logHeader( 'SCSS' );
		this.instance = this.instance.pipe( sass( config ).on( 'error', sass.logError ) );
		this.pipresolve( resolve );
	} );
};

/**
 * CSS Minify
 * @param config
 * @return {Promise<unknown>}
 */
ModuleHandler.prototype.minify = function( config = {} ) {
	return new Promise( ( resolve ) => {
		logHeader( 'Minify' );
		this.instance = this.instance.pipe( $minify_css( config ) ).on( 'error', logError );
		this.pipresolve( resolve );
	} );
};

/**
 * CSS Auto Prefixer
 * @param config
 * @return {Promise<unknown>}
 */
ModuleHandler.prototype.autoprefixer = function( config = {} ) {
	return new Promise( ( resolve ) => {
		logHeader( 'Autoprefixer' );
		this.instance = this.instance.pipe( $autoprefixer( config ) ).on( 'error', logError );
		this.pipresolve( resolve );
	} );
};

/**
 * Bable
 * @param config
 * @return {Promise<unknown>}
 */
ModuleHandler.prototype.babel = function( config ) {
	return new Promise( ( resolve ) => {
		logHeader( 'Babel' );
		this.instance = this.instance.pipe( $babel( config ) ).on( 'error', logError );
		this.pipresolve( resolve );
	} );
};

/**
 * Uglify JS
 * @param config
 * @return {Promise<unknown>}
 */
ModuleHandler.prototype.uglify = function( config ) {
	return new Promise( ( resolve ) => {
		logHeader( 'Uglify' );
		this.instance = this.instance.pipe( $uglify( config ) ).on( 'error', logError );
		this.pipresolve( resolve );
	} );
};

/**
 * Combine Files
 * @param config
 * @return {Promise<unknown>}
 */
ModuleHandler.prototype.combine_files = function( config ) {
	return new Promise( ( resolve ) => {
		logHeader( 'Combine Files' );
		this.instance = this.instance.pipe( $combine_files( config ) );
		this.pipresolve( resolve );
	} );
};

/**
 * Concats Files.
 * @param config
 * @return {Promise<unknown>}
 */
ModuleHandler.prototype.concat = function( config ) {
	return new Promise( ( resolve ) => {
		logHeader( 'Concat Files' );
		if( typeof config.options === 'object' && typeof config.options.filename !== 'undefined' ) {
			if( config.src ) {
				this.instance = this.instance.pipe( gulp.src( config.src ) )
									.pipe( $concat( config.options.filename, config.options ) )
									.on( 'error', logError );
			} else {
				this.instance = this.instance.pipe( $concat( config.options.filename, config.options ) )
									.on( 'error', logError );
			}

		} else if( typeof config === 'string' ) {
			this.instance = this.instance.pipe( $concat( config ) ).on( 'error', logError );
		}


		this.pipresolve( resolve );
	} );
};

/**
 * Handles Webpack.
 * @param config
 */
ModuleHandler.prototype.webpack = function( config ) {
	return new Promise( ( resolve, reject ) => {
		logHeader( 'WebPack' );

		this.instance = this.instance.pipe( $revert_path() )
							.pipe( $named() )
							.pipe( $webpack( config ) ).on( 'error', () => reject )
							.pipe( $revert_path() );
		this.pipresolve( resolve );
	} );
};
