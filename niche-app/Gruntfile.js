/**
 * Created by tapan on 2/24/16.
 */
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        'meta': {
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

        'karma': {
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

        'jshint': {
            'beforeconcat': ['source/**/*.js']
        }
    });

    grunt.registerTask('test', ['karma:development']);
};
