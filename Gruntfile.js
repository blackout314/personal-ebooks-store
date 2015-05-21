module.exports = function (grunt) {

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-ngmin');

    grunt.loadNpmTasks('grunt-ftp-deploy');

	var usrConfig = require('./config.js');

	var taskConfig = {
		pkg: grunt.file.readJSON("package.json"),

		meta: {
			bannerjs:
			'/**\n' +
			' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' */\n',
			bannercss:
			'/** <%= pkg.name %> */'
		},

		// clean work dir
		clean: [
			'<%= build_dir %>',
			'<%= compile_dir %>'
		],

		// concat
		concat: {
			build_css: {
				src: [
					'<%= vendor_files.css %>',
					'<%= build_dir %>/src/css/*.css'
				],
				dest: '<%= build_dir %>/src/assets/style.css'
			}
		},

		// copy
		copy: {
			build_appjs: {
				files: [
					{
						src: [ '<%= app_files.js %>' ],
						dest: '<%= build_dir %>/',
						//cwd: '.',
						expand: true
					}
				]
			},
			build_views: {
				files: [
					{
						src: [ '<%= app_files.views %>' ],
						dest: '<%= build_dir %>/',
						expand: true
					}
				]
			}
		},

		// sass
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/styles',
					src: ['*.scss'],
					dest: 'dist/src/css',
					ext: '.css'
				}]
			}
		},


		// uglify
		uglify: {
			compile_js: {
				options: {
					mangle:false
				},
				files: {
					'<%= build_dir %>/src/js/app.min.js': [ '<%= build_dir %>/src/app/**/*.js' ]
				}
			}
		},

		// cssmin
		cssmin: {
			compile_css: {
				options: {
					banner: '<%= meta.bannercss %>'
				},
				files: {
					'<%= concat.build_css.dest %>': '<%= concat.build_css.dest %>'
				}
			}
		},

		// jshint
		jshint: {
			src: [
				'<%= app_files.js %>'
			],
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true
			},
			globals: {}
		},

		// delta watch
		delta: {
			options: { livereload: true },
			jssrc: {
				files: [
					'<%= app_files.js %>'
				],
				tasks: [ 'jshint:src', 'copy:build_appjs', 'uglify' ]
			},
			csssrc: {
				files: [
					'<%= app_files.css %>'
				],
				tasks: [ 'sass', 'concat:build_css', 'cssmin:compile_css' ]
			}
		},

        // ftp deploy
        'ftp-deploy': {
            demo: {
                auth: {
                    host: 'ftp.blackout.altervista.org',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'dist/src',
                dest: 'pes',
                exclusions: [
                    'dist/src/**/.DS_Store',
                    'dist/src/**/Thumbs.db',
                    'dist/src/views/*.mp4',
                    'dist/src/views/*.jpg',
                    'dist/src/demo.html'
                    //'dist/src/assets',
                    //'dist/src/app',
                    //'dist/src/css',
                    //'dist/src/js'
                ]
            }
        }

		// -- out
	};

	grunt.initConfig( grunt.util._.extend( taskConfig, usrConfig ) );

	grunt.renameTask( 'watch', 'delta' );
	grunt.registerTask( 'watch', [ 'build', 'delta' ] );

	grunt.registerTask( 'build', [
		'clean', 'copy:build_views',
		'jshint', 'copy:build_appjs', 'uglify',
		'sass', 'concat', 'cssmin'
	]);
	grunt.registerTask( 'default', [ 'build' ] );
	grunt.registerTask('deploy', ['default']);
    grunt.registerTask( 'demo', [ 'ftp-deploy:demo' ] );
};
