'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var chalk = require('chalk');
var us = require('underscore.string');

var ComponentGenerator = yeoman.generators.NamedBase.extend({

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

		//set up the basics
		this.componentName = this.name;
		this.dirName = 'src/components/' + us.dasherize(this.name) + '/';
		this.fileName = us.dasherize(this.name);
		this.viewModelClassName = us.classify(this.name);

		this.log(chalk.yellow("CREATING COMPONENT: ") + chalk.red(this.componentName) );
		this.log(" ");

	},

	configuring: function() {
		this.log(chalk.cyan("Saving configuration..."));
		this.config.save();

	},

	writing: function() {
		this.log( "Writing to: " + this.destinationRoot() );

		this.templateOptions = {
			componentName: this.componentName,
			viewModelClassName: this.viewModelClassName,
			fileName: this.fileName,
			dirName: this.dirName
		};

		this.fs.copyTpl(
			this.templatePath('view.html'),
			this.destinationPath(this.dirName + this.fileName + '.html'),
			this.templateOptions
		)

		this.fs.copyTpl(
			this.templatePath('viewmodel.js'),
			this.destinationPath(this.dirName + this.fileName + '.js'),
			this.templateOptions
		)
	},

	addComponentRegistration: function() {
		var startupFile = 'src/app/startup.js';
		readIfFileExists.call(this, startupFile, function(existingContents) {
			var existingRegistrationRegex = new RegExp('\\bko\\.components\\.register\\(\s*[\'"]' + this.fileName + '[\'"]');
			if (existingRegistrationRegex.exec(existingContents)) {
				this.log(chalk.white(this.fileName) + chalk.cyan(' is already registered in ') + chalk.white(startupFile));
				return;
			}

			var token = '// [Scaffolded component registrations will be inserted here. To retain this feature, don\'t remove this comment.]',
				regex = new RegExp('^(\\s*)(' + token.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + ')', 'm'),
				modulePath = 'components/' + this.fileName + '/' + this.fileName,
				lineToAdd = 'ko.components.register(\'' + this.fileName + '\', { require: \'' + modulePath + '\' });',
				newContents = existingContents.replace(regex, '$1' + lineToAdd + '\n$&');
			fs.writeFile(startupFile, newContents);
			this.log(chalk.green('   registered ') + chalk.white(this.fileName) + chalk.green(' in ') + chalk.white(startupFile));

			if (fs.existsSync('gulpfile.js')) {
				this.log(chalk.magenta('To include in build output, reference ') + chalk.white('\'' + modulePath + '\'') + chalk.magenta(' in ') + chalk.white('gulpfile.js'));
			}
		});
	}

});

function readIfFileExists(path, callback) {
	if (fs.existsSync(path)) {
		callback.call(this, this.readFileAsString(path));
	}
}

module.exports = ComponentGenerator;
