'use strict';

var path$1 = require('path');
var fs = require('fs');
var chalk = require('chalk');
var commander = require('commander');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path$1);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var commander__default = /*#__PURE__*/_interopDefaultLegacy(commander);

const path = require('path');

const config = {
  'defaultFileName': {
    sofy: 'sofy.js',
    rollup: 'rollup.config.js',
    npm: 'package.json',
    babel: '.babelrc',
    babeljs: 'babel.config.js'
  },
  'configTemplates': {
    sofy: 'config-templates/sofy.js',
    rollup: 'config-templates/rollup.js',
    npm: 'config-templates/npm.json',
    babel: 'config-templates/babel-rc',
    babeljs: 'config-templates/babel.config.js'
  },
  'icon': {
    'success': path.join(__dirname, '/../resources/icon/success.png'),
    'error': path.join(__dirname, '/../resources/icon/error.png')
  },
  sound: false
};

const rtrim = require('lodash/trimEnd');

const cwd = rtrim(process.cwd(), '/') + '/';
function getFormattedTime() {
  let date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const nxtLine = `
`;
function log(x) {
  console.log(x);
}
function logError(x) {
  log(chalk__default['default'].redBright(x));
}
function logSuccess(x) {
  log(chalk__default['default'].green(x));
}
/*export function logBannerError( x ) {
	log( `${chalk.bgRedBright.bold.whiteBright( 'Error :' )} ${x}` );
}*/

function logHeader(x) {
  log(`   > ${chalk__default['default'].rgb(38, 38, 38)(`${x}`)}`);
}
function logProcessStart(x, processName = 'Starting') {
  log(`[${chalk__default['default'].yellow(getFormattedTime())}] ${chalk__default['default'].magenta(processName)} ${chalk__default['default'].black(`'${x}'`)}`);
}
function logProcessEnd(src, time) {
  log(`[${chalk__default['default'].yellow(getFormattedTime())}] ${chalk__default['default'].magenta('Finished')} ${chalk__default['default'].black(`'${src}'`)} ${chalk__default['default'].magenta('after')} ${chalk__default['default'].yellow(time)} ${chalk__default['default'].magenta('ms')} ${nxtLine}`);
}

const _ = require('lodash');

function createConfigFile(location, type = 'sofy') {
  return new Promise(resolve => {
    location = true === location ? './' : location;
    let customfile = false;
    let parsed = path__default['default'].parse(location);

    if (_.isUndefined(location)) {
      location = `./${config.defaultFileName[type]}`;
    } else if (_.isEmpty(parsed.ext)) {
      location = rtrim(location, '/');
      location = `${location}/${config.defaultFileName[type]}`;
    } else {
      customfile = config.defaultFileName[type] === parsed.base ? false : true;
    }

    fs__default['default'].copyFile(`../${config.configTemplates[type]}`, location, err => {
      if (err) {
        logError(`Unable To Create Config File. Please Check The Provided Location : ${location}`);
        process.exit(1);
      }

      log('');
      logSuccess(`Success File Created`);
      log(chalk__default['default'].blue(`Location : ${location}`));
      let logmsg = false;

      if ('sofy' === type) {
        logmsg = `${chalk__default['default'].dim(`Invoke CMD :`)} node sofy`;

        if (customfile) {
          logmsg += `${chalk__default['default'].grey(` --config "${location}"`)}`;
        }

        logmsg += `${chalk__default['default'].grey(' --compile')}`;
      } else if ('rollup' === type) {
        logmsg = `${chalk__default['default'].dim(`Invoke CMD :`)} rollup -c`;
        logmsg += `${chalk__default['default'].dim(`Watch CMD :`)} rollup -c --watch`;

        if (customfile) {
          logmsg += `${chalk__default['default'].grey(` --config "${location}"`)}`;
        }
      }

      if (logmsg) {
        log(logmsg);
      }

      resolve();
    });
  });
}

//const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
let config$1 = {};
config$1.concat = {
  newline: ';'
};
config$1.uglify = true;
config$1.babel = {
  presets: [['@babel/env', {
    loose: true,
    useBuiltIns: false
  }]],
  compact: false
};
config$1.combine_files = {
  append: 'sofy-append',
  prepend: 'sofy-prepend',
  inline: 'sofy-inline'
};
config$1.scss = {
  outputStyle: 'expanded'
};
config$1.autoprefixer = {
  overrideBrowserslist: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
  cascade: false
};
config$1.minify = {
  options: {},
  callback: {}
};
config$1.webpack = {
  mode: 'production',
  output: {
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: config$1.babel
    }]
  }
};
config$1.webpack_dev = {
  devtool: 'source-map',
  mode: 'development',
  //plugins: [ new UglifyJsPlugin() ],
  target: 'node',
  externals: {
    jquery: 'jQuery'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: config$1.babel
    }]
  }
};

const _$1 = require('lodash');

let currentConfigFile = false;
let userConfigData = false;
let globalConfigData = false;
/**
 * Validates Config File Location. Based on users Input.
 * @param location
 * @return {boolean}
 */

function validateConfigFile(location) {
  let currentFile = false;

  if (_$1.isUndefined(location) || false !== location) {
    let parsed = path__default['default'].parse(location);

    if (!_$1.isEmpty(parsed.ext) && '.js' === parsed.ext) {
      currentFile = validateCustomConfigLocation(`${rtrim(location, '/')}`);
    } else {
      currentFile = validateCustomConfigLocation(`${rtrim(location, '/')}/${config.defaultFileName}`);
    }
  } // Validates With Default Location


  if (!currentFile) {
    try {
      currentFile = fs__default['default'].existsSync(`./${config.defaultFileName}`) ? `./${config.defaultFileName}` : false;
    } catch (e) {
      currentFile = false;
    }
  }

  if (!currentFile) {
    logError('Config File Not Found. Please Check `--config / -c` argument. make sure you have sofy.js in our project root ');
    process.exit(5);
  }

  currentConfigFile = currentFile;
  return currentConfigFile;
}
/**
 * Checks if file exists.
 * @param location
 * @return {boolean|*}
 */

function validateCustomConfigLocation(location) {
  try {
    return fs__default['default'].existsSync(location) ? location : false;
  } catch (e) {
    return false;
  }
}
/**
 * Fetches User Config Data From The Config File.
 * @return {boolean}
 */

function getUserConfig() {
  if (false === userConfigData) {
    userConfigData = require(`${cwd}${currentConfigFile}`);
  }

  return userConfigData;
}
/**
 * Merges All Config Into 1 And Provides Option To Fetch It.
 *
 * @return {*|boolean}
 */

function getAddonConfig() {
  if (false === globalConfigData) {
    if (!_$1.isUndefined(getUserConfig().config)) {
      globalConfigData = _$1.merge(config$1, getUserConfig().config);
    } else {
      globalConfigData = config$1;
    }
  }

  return globalConfigData;
}

const gulp = require('gulp');
/**
 * Sofy Module Base Handler.
 * @param $src string
 * @param $config array/object
 * @param $type
 */


function ModuleHandler ($src, $config, $type = 'general') {
  this.src = $src;
  this.config = $config;
  this.name = this.src;
  this.type = $type;

  if (typeof this.config.src !== 'undefined') {
    this.src = this.config.src;
    delete this.config.src;
  }

  if (typeof this.config.name !== 'undefined') {
    this.name = this.config.name;
    delete this.config.name;
  }

  if ('general' === this.type) {
    this.instance = gulp.src(this.src);
  }

  this.timeTaken = false;
}

const gulp$1 = require('gulp');

const sass = require('gulp-sass');

const $minify_css = require('gulp-clean-css');

const $autoprefixer = require('gulp-autoprefixer');

const $babel = require('gulp-babel');

const $uglify = require('gulp-uglify');

const $combine_files = require('gulp-combine-files');

const $concat = require('gulp-concat');

const $webpack = require('webpack-stream');

const $revert_path = require('gulp-revert-path');

const $named = require('vinyl-named');
/**
 * Sass / scss Compiler
 * @param config
 * @return {Promise<unknown>}
 */


ModuleHandler.prototype.scss = function (config = {}) {
  return new Promise(resolve => {
    logHeader('SCSS');
    this.instance = this.instance.pipe(sass(config).on('error', sass.logError));
    this.pipresolve(resolve);
  });
};
/**
 * CSS Minify
 * @param config
 * @return {Promise<unknown>}
 */


ModuleHandler.prototype.minify = function (config = {}) {
  return new Promise(resolve => {
    logHeader('Minify');
    this.instance = this.instance.pipe($minify_css(config)).on('error', logError);
    this.pipresolve(resolve);
  });
};
/**
 * CSS Auto Prefixer
 * @param config
 * @return {Promise<unknown>}
 */


ModuleHandler.prototype.autoprefixer = function (config = {}) {
  return new Promise(resolve => {
    logHeader('Autoprefixer');
    this.instance = this.instance.pipe($autoprefixer(config)).on('error', logError);
    this.pipresolve(resolve);
  });
};
/**
 * Bable
 * @param config
 * @return {Promise<unknown>}
 */


ModuleHandler.prototype.babel = function (config) {
  return new Promise(resolve => {
    logHeader('Babel');
    this.instance = this.instance.pipe($babel(config)).on('error', logError);
    this.pipresolve(resolve);
  });
};
/**
 * Uglify JS
 * @param config
 * @return {Promise<unknown>}
 */


ModuleHandler.prototype.uglify = function (config) {
  return new Promise(resolve => {
    logHeader('Uglify');
    this.instance = this.instance.pipe($uglify(config)).on('error', logError);
    this.pipresolve(resolve);
  });
};
/**
 * Combine Files
 * @param config
 * @return {Promise<unknown>}
 */


ModuleHandler.prototype.combine_files = function (config) {
  return new Promise(resolve => {
    logHeader('Combine Files');
    this.instance = this.instance.pipe($combine_files(config));
    this.pipresolve(resolve);
  });
};
/**
 * Concats Files.
 * @param config
 * @return {Promise<unknown>}
 */


ModuleHandler.prototype.concat = function (config) {
  return new Promise(resolve => {
    logHeader('Concat Files');

    if (typeof config.options === 'object' && typeof config.options.filename !== 'undefined') {
      if (config.src) {
        this.instance = this.instance.pipe(gulp$1.src(config.src)).pipe($concat(config.options.filename, config.options)).on('error', logError);
      } else {
        this.instance = this.instance.pipe($concat(config.options.filename, config.options)).on('error', logError);
      }
    } else if (typeof config === 'string') {
      this.instance = this.instance.pipe($concat(config)).on('error', logError);
    }

    this.pipresolve(resolve);
  });
};
/**
 * Handles Webpack.
 * @param config
 */


ModuleHandler.prototype.webpack = function (config) {
  return new Promise((resolve, reject) => {
    logHeader('WebPack');
    this.instance = this.instance.pipe($revert_path()).pipe($named()).pipe($webpack(config)).on('error', () => reject).pipe($revert_path());
    this.pipresolve(resolve);
  });
};

/**
 * Gulp Related
 */

const {
  dest
} = require('gulp');

const $rename = require('gulp-rename');

const through = require('through2');

const _$2 = require('lodash');

const fn = ModuleHandler.prototype;
const excludeModule = ['dist', 'log', 'pipresolve', 'watch'];
/*fn.log = {
	section: () => log( nxtLine ),

	plain: ( x ) => log( `${x}` ),

	error: ( x ) => log( `${chalk.bgRedBright.bold.whiteBright( 'Error :' )} ${x}` ),

	header: ( x ) => log( `   > ${chalk.rgb( 38, 38, 38 )( `${x}` )}` ),

	successHeader: ( x ) => log( `* ${chalk.bgGreenBright.blackBright( `${x}` )}` ),

	fileHeader: ( x ) => log( `Using File : ${chalk.bgBlueBright.whiteBright( `${x}` )}` ),

	processStart: ( x, processName = 'Starting' ) => log( `[${chalk.yellow( getFormattedTime() )}] ${chalk.magenta( processName )} ${chalk.black( `'${x}'` )}` ),

	processEnd: ( src, time ) => {
		log( `[${chalk.yellow( getFormattedTime() )}] ${chalk.magenta( 'Finished' )} ${chalk.black( `'${src}'` )} ${chalk.magenta( 'after' )} ${chalk.yellow( time )} ${chalk.magenta( 'ms' )} ${nxtLine}` );
	},
};*/

fn.getConfig = function (type, userConfig) {
  let global_config = getAddonConfig();

  if (!_$2.isUndefined(global_config[type])) {
    userConfig = true === userConfig ? {} : userConfig;

    if (_$2.isString(userConfig)) {
      return !_$2.isUndefined(global_config[userConfig]) ? global_config[userConfig] : userConfig;
    } else {
      let $global_config = global_config[type];
      return _$2.merge($global_config, userConfig);
    }
  }

  return true === userConfig ? null : userConfig;
};

fn.pipresolve = function (resolve) {
  this.instance = this.instance.pipe(through.obj((chunk, enc, cb) => {
    resolve(this);
    cb(null, chunk);
  }));
};

fn.save = function () {
  return new Promise(resolve => {
    if (!_$2.isUndefined(this.config.rename)) {
      this.instance = this.instance.pipe($rename(this.config.rename));
    }

    this.instance = this.instance.pipe(dest(`${cwd}${this.config.dist}`));
    this.instance.on('end', () => {
      if (!_$2.isUndefined(this.config.rename)) {
        resolve(`${rtrim(this.config.dist, '/')}/${this.config.rename}`);
      } else {
        resolve(`${rtrim(this.config.dist, '/')}`);
      }
    });
  });
};

fn.timer = function () {
  if (false === this.timeTaken) {
    this.timeTaken = +new Date();
  } else {
    return +new Date() - this.timeTaken;
  }
};

fn.run = function () {
  return new Promise((resolve, reject) => {
    (async () => {
      this.timer();
      logProcessStart(this.name);

      if ('general' === this.type) {
        for (let $id in this.config) {
          if (false === this.config[$id]) {
            continue;
          }

          if (!_$2.isUndefined(this[$id])) {
            await this[$id](this.getConfig($id, this.config[$id])).catch(reason => reject({
              msg: reason,
              instance: this
            }));
          } else if (!$id in excludeModule) {
            logError(`Module Error : ${chalk__default['default'].blue($id)} Not Found In Sofy Builder !!`);
          }
        }

        let place = await this.save();
        log(`   ✔ Compiled & Saved In ${chalk__default['default'].green(place)}`);
      }

      logProcessEnd(this.name, this.timer());
      resolve({
        msg: false,
        instance: this
      });
    })();
  });
};

const _$3 = require('lodash');

const notifier = require('node-notifier');

let notifyID = 0;
function initSingleFile(src, data, type = 'general') {
  return new Promise(resolve => {
    let $ins = new ModuleHandler(src, data, type);
    $ins.run().then(reason => {
      notifier.notify({
        title: `Wooofff. Success`,
        message: `${reason.instance.name} File Successfully Processed`,
        sound: config.sound,
        appID: 'Sofy',
        icon: config.icon.success,
        id: notifyID++
      });
    }).catch(reason => {
      notifier.notify({
        title: `Woff !! Error Occured.`,
        message: `Unable To Process ${reason.instance.name} Please Check Terminal For Logs`,
        sound: config.sound,
        appID: 'Sofy',
        icon: config.icon.error,
        id: notifyID++
      });
      console.log(reason.msg);
    }).finally(() => {
      resolve();
    });
  });
}

function processArrayofUserFiles(src, data) {
  return new Promise(resolve => {
    let current = data.shift();

    if (!_$3.isUndefined(current) && _$3.isObject(current)) {
      initSingleFile(src, current).then(() => {
        if (!_$3.isEmpty(data) && _$3.isArray(data)) {
          return processArrayofUserFiles(src, data);
        }
      }).then(() => {
        return resolve();
      });
    }
  });
}

async function processUserFiles() {
  let $userConig = getUserConfig();
  let $files = $userConig.files;

  if (!_$3.isEmpty($files) && _$3.isObject($files)) {
    for (let $id in $files) {
      if (_$3.isArray($files[$id])) {
        await processArrayofUserFiles($id, $files[$id]);
      } else {
        await initSingleFile($id, $files[$id]);
      }
    }
  }
}

const {
  watch
} = require('gulp');

const _$4 = require('lodash');

function handleSingleWatch($_src, $file) {
  let $src = !_$4.isUndefined($file.src) ? $file.src : $_src;
  let $watch = !_$4.isUndefined($file.watch) && false !== $file.watch ? $file.watch : false;
  $watch = true === $watch ? $src : $watch;

  if (false !== $watch) {
    logProcessStart($_src, 'Watching');
    watch($watch, {
      queue: true
    }, function (cb) {
      // body omitted
      initSingleFile($src, $file).finally(() => cb());
    });
  }
}

function watch$1 () {
  let $userConig = getUserConfig();
  let $files = $userConig.files;

  if (!_$4.isEmpty($files) && _$4.isObject($files)) {
    for (let $id in $files) {
      if (_$4.isArray($files[$id])) {
        for (let $_id in $files[$id]) {
          handleSingleWatch($id, $files[$id][$_id]);
        }
      } else {
        handleSingleWatch($id, $files[$id]);
      }
    }
  }

  log('');
}

const _$5 = require('lodash');

function triggerTask(_argument) {
  if (!_$5.isUndefined(_argument.compile)) {
    processUserFiles();
  }

  if (!_$5.isUndefined(_argument.watch)) {
    watch$1();
  }
}

const _$6 = require('lodash');

function sofy() {
  const pkg = require('../package.json');

  const program = new commander__default['default'].Command();
  program.version(pkg.version);
  program.option('-c, --config [location]', 'Custom Location For Config File', './sofy.js').option('--compile', 'Triggers Build For All Files Listed In Config File').option('--watch', 'Watches For Files For Updates & Triggers Process.').option('--create [configType...]', 'Creates Sofy\'s Config file').parse(process.argv);

  if (!_$6.isUndefined(program.create)) {
    let create = true === program.create ? [] : program.create;
    let location = create[1] || true;
    let type = create[0] || 'sofy';

    if ('all' === type) {
      for (let id in config.configTemplates) {
        createConfigFile(location, id);
      }
    } else {
      createConfigFile(location, type);
    }
  } else {
    validateConfigFile(program.config);
    triggerTask(program);
  }
}

module.exports = sofy;
