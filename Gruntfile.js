'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			options: {

			},
			html: {
				files: '**/*.html',
				tasks: {},
				options: {
					livereload: true,
					nospawn: true
				}
			},
			coffee: {
				files: 'assets/coffee/**/*.coffee',
				tasks: 'coffee',
				options: {
					livereload: true,
					nospawn: true
				}
			},
			sass: {
				files: 'assets/scss/**/*.scss',
				tasks: 'compass',
				options: {
					livereload: true,
					nospawn: true
				}
			},
			all: {
				files: [
					'<%= watch.html.files %>',
					'<%= watch.coffee.files %>',
					'<%= watch.sass.files %>'
				],
				tasks: ['js', 'css'],
				options: {
					livereload: true,
					nospawn: true
				}
			}
		},
		coffee: {
			compile: {
				expand: true,
				cwd: 'assets/coffee',
				src: ['**/*.coffee'],
				dest: 'assets/dist/js',
				ext: '.js',
				options: {
					bare: true
				}
			}
		},
		compass: {
			compile: {
				linecomments: false,
				forcecompile: true,
				debugsass: false,
				relativeassets: true,
				options: {
					config: 'config.rb'
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 8888,
					middleware: function(connect, options) {
						return [lrSnippet, folderMount(connect, '.')];
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-coffee');

	grunt.registerTask('js', ['coffee']);
	grunt.registerTask('css', ['compass']);
	grunt.registerTask('default', ['connect','watch:all']);
};
