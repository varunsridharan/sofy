/**
 * Rollup Core
 */
import nodeResolve from '@rollup/plugin-node-resolve';

/**
 * ES6 To ES5
 */
import babel from '@rollup/plugin-babel';

/**
 * Minify
 */
import { terser } from "rollup-plugin-terser";
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import { uglify } from 'rollup-plugin-uglify';

/**
 * Utility
 */
import license from 'rollup-plugin-license';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';
import replace from "@rollup/plugin-replace";

/**
 * Package.JSON
 */
import pkg from "./package.json";


const config = {};

export default config;
