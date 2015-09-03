'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var slug = require('slug');
var glob = require('glob');

module.exports = yeoman.generators.Base.extend({
	initializing: function() {
		this.log(chalk.cyan("      ______        __ ______ "));
		this.log(chalk.cyan("     / __/ /____ __/ //_/ __ \\"));
		this.log(chalk.cyan("    _\\ \\/  '_/ // / ,< / /_/ /"));
		this.log(chalk.cyan("   /___/_/\\_\\\\_, /_/|_|\\____/ "));
		this.log(chalk.cyan("            /___/             "));
		this.log(chalk.yellow(" +----------------------------+"));
		this.log(chalk.yellow(" |") + chalk.green (" You're using the fantastic ") + chalk.yellow("|"));
		this.log(chalk.yellow(" |") + chalk.green (" Sky Knockout app generator.") + chalk.yellow("|"));
		this.log(chalk.yellow(" +----------------------------+"));
		this.log(chalk.red("CREATING APPLICATION..."));
		this.log(" ");
	},

	prompting: function() {
		var done = this.async();

		var prompts = [
			{
				name: 'name',
				message: 'What\'s the name of your new application ?',
				default: this.appname
			},
			{
				name: 'desc',
				message: 'What\'s the description of your new application ?',
				default: 'some application called ' + this.appname
			},
			{
				type: 'confirm',
				name: 'includeTests',
				message: 'Do you want to include automated tests, using Jasmine and Karma ?',
				default: true
			}];

		this.prompt(prompts, function (props) {
			this.longName = props.name;
			this.slugName = slug(this.longName);
			this.desc = props.desc;
			this.includeTests = props.includeTests;
			done();
		}.bind(this));
	},

	writing: function() {
		this.config.save();
		this.log( "Writing to: " + this.destinationRoot() );

		this.templateOptions = {
			longName: this.longName,
			desc: this.desc,
			slugName: this.slugName,
			includeTests: this.includeTests
		};

		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'),
			this.templateOptions
		)

		this.fs.copyTpl(
			this.templatePath('_bower.json'),
			this.destinationPath('bower.json'),
			this.templateOptions
		)

		this.fs.copyTpl(
			this.templatePath('_gulpfile.js'),
			this.destinationPath('gulpfile.js'),
			this.templateOptions
		)

		this.fs.copyTpl(
			this.templatePath('_gitignore'),
			this.destinationPath('.gitignore'),
			this.templateOptions
		)

		this.fs.copy(
			this.templatePath('bowerrc'),
			this.destinationPath('.bowerrc')
		)

		this._processDirectory('src/');
		if( this.includeTests ) {
			this._processDirectory('test/');
			this.fs.copy(
				this.templatePath('bowerrc_test'),
				this.destinationPath('test/.bowerrc')
			)
			this.fs.copy(
				this.templatePath('karma.conf.js'),
				this.destinationPath('karma.conf.js')
			)
		}
	},

	install: function() {
		this.installDependencies();
		if (this.includeTests) {
			// Install test dependencies too
			var bowerArgs = ['install'];
			this.spawnCommand('bower', bowerArgs, { cwd: 'test' });
		}
	},

	_processDirectory: function(sourceDir) {
		var files = glob.sync('**', { dot: true, cwd: this.templatePath(sourceDir), nodir: true });
		for (var i = 0; i < files.length; i++) {
			var f = sourceDir + files[i];
			var src = this.templatePath(f);
			var dest = this.destinationPath(path.join(path.dirname(f), path.basename(f).replace(/^_/, '')));
			if(path.basename(f).indexOf('_') == 0) {
				this.fs.copyTpl(
					src,
					dest,
					this.templateOptions
				)
			} else {
				this.fs.copy(
					src,
					dest
				)
			}
		}
	}

});
