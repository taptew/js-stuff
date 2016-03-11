/**
 * Created by tapan on 2/24/16.
 */
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bowercopy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            'jsFilesForTesting': [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-route/angular-route.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/restangular/dist/restangular.js',
                'bower_components/underscore/underscore.js',
                'test/**/*Spec.js'
            ],

            'jsForApp': [
                'source/js/**/*Module.js',
                'source/js/**/*Services.js',
                'source/js/**/*Controllers.js',
                'source/js/app.js'
            ],
            'cssForApp': [
                'source/css/**/*.css'
            ]
        },

        clean: {
            dist: ['dist/**/*']
        },


        injector: {
            development : {
                options : {
                    relative: false,
                    addRootSlash: false
                },
                files: {
                    'source/index.html': ['<%= meta.jsForApp %>', '<%= meta.cssForApp %>']
                }
            },
            development_bower : {
                options : {
                    cwd: 'source',
                    relative: false,
                    addRootSlash: false,
                    bowerPrefix: 'bower:'
                },
                files: {
                    'source/index.html': ['bower.json']
                }
            },

            dist: {
                options : {
                    relative: true,
                    min: true,
                    bowerPrefix: 'bower:'
                },
                files: {
                    'dist/index.html': ['dist/<%= pkg.distname %>-<%= pkg.version %>.min.js', '<%= meta.cssForApp %>', 'bower.json']
                }
            }
        },

        karma: {
            'development': {
                'configFile': 'karma.conf.js',
                'options': {
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        '<%= meta.jsForApp %>'
                    ]
                }
            },
            'dist': {
                'options': {
                    'configFile': 'karma.conf.js',
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        'dist/<%= pkg.distname %>-<%= pkg.version %>.js'
                    ]
                }
            },
            'minified': {
                'options': {
                    'configFile': 'karma.conf.js',
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        'dist/<%= pkg.distname %>-<%= pkg.version %>.min.js'
                    ]
                }
            }
        },

        jshint: {
            'beforeconcat': ['source/**/*.js']
        },

        concat: {
            'dist': {
                'src': ['<%= meta.jsForApp %>'],
                'dest': 'dist/<%= pkg.distname %>-<%= pkg.version %>.js'
            }
        },

        uglify: {
            options: {
                'mangle': false
            },
            dist: {
                files: {
                    'dist/<%= pkg.distname %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.distname %>-<%= pkg.version %>.js']
                }
            }
        },

        jsdoc: {
            'src': ['source/**/*.js'],
            'options': {
                'destination': 'doc'
            }
        },

        copy: {
            dist: {
                files: [
                    { expand: true, cwd: "source/", src: ['**/*.html'], dest: 'dist/' }
                ]
            }
        }

    });

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('dev', [
        'jshint',
        'karma:development',
        'injector:development_bower',
        'injector:development'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'karma:development',
        'concat',
        'karma:dist',
        'uglify',
        'karma:minified',
        'jsdoc',
        'copy:dist',
        'injector:dist',
        'bowercopy:dist'
    ]);
};
