/**
 * Created by tapan on 2/24/16.
 */
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-injector');

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
            ]
        },

        injector: {
            bower : {
                options : {
                    starttag : '<!-- bower: -->',
                    endtag : '<!-- endbower -->',
                    addRootSlash : false // depends on your project
                },
                files : {
                    'source/index.html' : [ 'bower.json' ]
                }
            },
            app : {
                options : {
                    addRootSlash : false, // depends on your project
                    relative : true // depends on your project
                },
                files : {
                    'index.html' : [ 'ordered application js files', 'another file', '...' ],
                }
            }
        },

        karma: {
            'development': {
                'configFile': 'karma.conf.js',
                'options': {
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        'source/**/*.js'
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
                'src': ['source/**/*.js'],
                'dest': 'dist/<%= pkg.distname %>-<%= pkg.version %>.js'
            }
        },

        uglify: {
            'options': {
                'mangle': false
            },
            'dist': {
                'files': {
                    'dist/<%= pkg.distname %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.distname %>-<%= pkg.version %>.js']
                }
            }
        },

        jsdoc: {
            'src': ['source/**/*.js'],
            'options': {
                'destination': 'doc'
            }
        }
    });

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('build', [
        'jshint',
        'karma:development',
        'concat',
        'karma:dist',
        'uglify',
        'karma:minified',
        'jsdoc'
    ]);
};
