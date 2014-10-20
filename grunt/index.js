'use strict';

var loadConfig = require('./helpers').loadConfig;

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    grunt.initConfig(loadConfig('./grunt/tasks/'));

    grunt.registerTask('dev', ['connect', 'watch']);

    grunt.registerTask('build', []);

};