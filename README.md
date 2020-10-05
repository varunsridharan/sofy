<p align="center">
  <a href="https://www.instagram.com/sofythelabrador/">
    <img  align="left"  width="250" src="https://cdn.svarun.dev/gh/varunsridharan/sofy/pic1.jpg">
  </a>
  <br/><br/>
  Hi There! I am <strong><a href="https://www.instagram.com/sofythelabrador/">Sofy The Labrador</a></strong>. 
  <br/> <br/>
  I have been turned into a virtual assistant to assist your javascript related work. 
<br/> <br/>
 Make your life easier by automating certain processes :-)
</p>

<br/><br/> 

## ⚙️Installation
The preferred way to install this extension is through [Composer][composer].

To install **Sofy**, simply:

    $ npm install sofy --save-dev
    

## 🚀 Usage

### Step 1
Simply run the below cmd from your project root

    $ sofy --create
This will create ___sofy.js___ file in your project root which looks like below
```javascript
const files  = {};
const config = {};

module.exports = {
	files: files,
	config: config,
};
```

### Step 2
Customize ___sofy.js___ based on your needs

> Sample Config File
```javascript
module.exports = {
	files: {
		// Single Compile Options
		'dir/your-file-source': {
			dist: 'path-to-save',
			rename: 'custom-file-name',
			bable: {
			// Your Custom Config For **Babel** 
			// Or Set True to use deafult config provided by Easy Gulp Tasker Plugin.
			// If not pass a custom string and use that string in the config array to build your own common config.
			},
			watch:['file1','file2','file3'] // enter the files that are needed to be watched to trigger the above actions.
		},

		// Multiple Compile Options
		'dir2/your-file-source': [
			{
				dist: 'path-to-save',
				rename: 'custom-file-name',
				bable: true
			},
			{
				dist: 'path-to-save',
				rename: 'custom-file-name',
				bable: true,
				uglify: true
			}
		]
	},

	config: {
		// Here you can write your custom config
		bable_custom_config1: {
			presets: [ '@babel/env' ],
		}
	},
};
```

### Step 3
Run any of the below cmd to use this plugin

The below cmd will compile all the files are listed in the ___sofy.js___

    $ sofy --compile


The below cmd will trigger `gulp.watch` function to keep track of files changes and compiles the given file.

    $ sofy --watch


Below cmd will create a basic **Sofy** Config File

    $ sofy --create sofy ./


Below CMD will create a basic **RollUP** Config File

    $ sofy --create rollup ./


Below CMD will create a basic **.babelrc** Config File

    $ sofy --create bable ./


Below CMD will create a basic **babeljs** Config File

    $ sofy --create babeljs ./


Below CMD will create a basic **package.json** Config File

    $ sofy --create npm ./

Below CMD Will create all config files in the given location

    $ sofy --create all ./

---

## Builtin Tasks
Blow is a list of task / config options for each file object.

### General
* `dist:'file-save-path'` | Location On Where To Save The File.
* `rename:'custom-file-name'` | Custom File Name To Save Compiled File
* `watch:['file1','file2','file3'] ` | An Array of files to keep an eye for change to trigger its tasks / provide a single file name / set it to true
* `concat:true` | Please Refer To [Gulp Concat](http://npmjs.com/package/gulp-concat)
* `combine_files:true` | Please Refer To [Gulp Combine Files](https://www.npmjs.com/package/gulp-combine-files)

### SCSS / CSS
* `scss:true` | Converts SCSS Into CSS
* `minify:true` | Minify Source.
* `autoprefixer:true` | Autoprefix All CSS Properties.

### Javascript
* `webpack:true` | Run's Webpack To Compile / Bundle a file
* `bable:true` | Run's Babel To Convert **EM6 => EM6**
* `uglify:true` | Minify JS Soure Code
---

## 📝 Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[Checkout CHANGELOG.md](/CHANGELOG.md)

## 🤝 Contributing
If you would like to help, please take a look at the list of [issues](issues/).

## 💰 Sponsor
[I][twitter] fell in love with open-source in 2013 and there has been no looking back since! You can read more about me [here][website].
If you, or your company, use any of my projects or like what I’m doing, kindly consider backing me. I'm in this for the long run.

- ☕ How about we get to know each other over coffee? Buy me a cup for just [**$9.99**][buymeacoffee]
- ☕️☕️ How about buying me just 2 cups of coffee each month? You can do that for as little as [**$9.99**][buymeacoffee]
- 🔰         We love bettering open-source projects. Support 1-hour of open-source maintenance for [**$24.99 one-time?**][paypal]
- 🚀         Love open-source tools? Me too! How about supporting one hour of open-source development for just [**$49.99 one-time ?**][paypal]

## 📜  License & Conduct
- [**General Public License v3.0 license**](LICENSE) © [Varun Sridharan](website)
- [Code of Conduct](code-of-conduct.md)

## 📣 Feedback
- ⭐ This repository if this project helped you! :wink:
- Create An [🔧 Issue](issues/) if you need help / found a bug

## Connect & Say 👋
- **Follow** me on [👨‍💻 Github][github] and stay updated on free and open-source software
- **Follow** me on [🐦 Twitter][twitter] to get updates on my latest open source projects
- **Message** me on [📠 Telegram][telegram]
- **Follow** my pet on [Instagram][sofythelabrador] for some _dog-tastic_ updates!

---

<p align="center">
<i>Built With ♥ By <a href="https://sva.onl/twitter"  target="_blank" rel="noopener noreferrer">Varun Sridharan</a> 🇮🇳 </i>
</p>

---

<!-- Personl Links -->
[paypal]: https://sva.onl/paypal
[buymeacoffee]: https://sva.onl/buymeacoffee
[sofythelabrador]: https://www.instagram.com/sofythelabrador/
[github]: https://sva.onl/github/
[twitter]: https://sva.onl/twitter/
[telegram]: https://sva.onl/telegram/
[email]: https://sva.onl/email
[website]: https://sva.onl/website/

<!-- Private -->
[composer]: https://sva.onl/composer/
[downloadzip]:https://github.com/varunsridharan/vsp-framework/archive/master.zip
[wpcsl]: https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/

<!-- Poser -->
[latest-stable-version-img]: https://poser.pugx.org/varunsridharan/php-autoloader/version
[latest-Unstable-version-img]: https://poser.pugx.org/varunsridharan/php-autoloader/v/unstable
[total-downloads-img]: https://poser.pugx.org/varunsridharan/php-autoloader/downloads
[Latest-Unstable-version-img]: https://poser.pugx.org/varunsridharan/php-autoloader/v/unstable
[license-img]: https://poser.pugx.org/varunsridharan/php-autoloader/license
[composerlock-img]: https://poser.pugx.org/varunsridharan/php-autoloader/composerlock
[wpcs-img]: https://img.shields.io/badge/WordPress-Standar-1abc9c.svg

<!-- Packagist Links -->
[lsvl]: https://packagist.org/packages/varunsridharan/php-autoloader
[luvl]: https://packagist.org/packages/varunsridharan/php-autoloader
[tdl]: https://packagist.org/packages/varunsridharan/php-autoloader
[licenselink]: https://packagist.org/packages/varunsridharan/php-autoloader
[composerlocklink]: https://packagist.org/packages/varunsridharan/php-autoloader
