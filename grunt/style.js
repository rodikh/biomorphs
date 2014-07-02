'use strict';

module.exports = function (grunt) {

    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc'
        },
        all: {
            src: ['demos/**/*.js']
        }
    });

    grunt.config('jscs', {
        options: {
            config: '.jscs.json'
        },
        src: ['demos/**/*.js']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs-checker');
};
