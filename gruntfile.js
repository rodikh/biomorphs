'use strict';

/**
 * The main grunt file which loads all other custom tasks
 * and tasks configurations from the /grunt folder.
 *
 * @param grunt {Object}
 */
module.exports = function (grunt) {
    grunt.loadTasks('grunt');

    grunt.registerTask('lint', ['jshint', 'jscs']);
};
