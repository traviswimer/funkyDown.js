var package = require('./package.json');
var libraryTempFileName = package.name + '.js';
var libraryBuildFileName = package.name + '-' + package.version + '.min.js';

var browserifyFiles = {};
browserifyFiles[libraryTempFileName] = ['src/main.js'];

var uglifyFiles = {};
uglifyFiles[libraryBuildFileName] = [libraryTempFileName];

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
				src: ['tests/**/*.html'],
				dest: './tests/output/xunit.out',
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('default', ['browserify', 'mocha', 'watch']);
	grunt.registerTask('build', ['browserify', 'mocha', 'uglify']);


};