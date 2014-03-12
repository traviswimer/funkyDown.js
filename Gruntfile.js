var package = require('./package.json');
var libraryTempFileName = package.name + '.js';
var libraryBuildFileName = package.name + '-' + package.version + '.min.js';

var browserifyFiles = {};
browserifyFiles[libraryTempFileName] = ['src/main.js'];

var uglifyFiles = {};
uglifyFiles[libraryBuildFileName] = [libraryBuildFileName];

var banner = "/* funkyDown.js v0.0.1 | (c) 2014 Travis Wimer | https://raw.github.com/traviswimer/funkyDown.js/master/LICENSE.txt */\n";
banner += "/* Showdown Copyright (c) 2007, John Fraser | <http://www.attacklab.net/> | All rights reserved. */\n"
banner += "/* Original Markdown copyright (c) 2004, John Gruber | <http://daringfireball.net/> | All rights reserved. */\n"
banner += "/* Showdown license: https://raw.github.com/coreyti/showdown/master/license.txt */\n"

module.exports = function(grunt){

	grunt.initConfig({
		watch: {
			unitTests: {
				files: [
					'src/**/*.js',
					'tests/**/*.js'
				],
				tasks: ['browserify', 'mocha']
			}
		},
		mocha: {
			test: {
				options: {
					run: true,
				},
				src: ['tests/**/*.html']
			},
		},
		browserify: {
			dist: {
				files: browserifyFiles
			}
		},
		uglify: {
			my_target: {
				files: uglifyFiles
			}
		},
		umd: {
			all: {
				src: libraryTempFileName,
				objectToExport: 'funkyDown',
				amdModuleId: 'funkydown',
				globalAlias: 'alias',
			}
		},
		concat: {
			options: {
				banner: banner
			},
			dist: {
				src: [libraryBuildFileName],
				dest: libraryBuildFileName,
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-umd');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['browserify', 'mocha', 'watch']);
	grunt.registerTask('build', ['browserify', 'mocha', 'umd', 'uglify', 'concat']);


};