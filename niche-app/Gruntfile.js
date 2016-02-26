/**
 * Created by tapan on 2/24/16.
 */
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

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

        karma: {
            'development': {
                'configFile': 'karma.conf.js',
                'options': {
                    'files': [
                        '<%= meta.jsFilesForTesting %>',
                        'source/**/*.js'
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
        }
    });

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('build', ['jshint', 'test', 'concat', 'uglify']);
    

};
