'use strict';

module.exports = function (grunt) {

    // Show elapsed time after tasks run to visualize performance
    require('time-grunt')(grunt);
    // Load all Grunt tasks that are listed in package.json automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // shell commands for use in Grunt tasks
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve --force_polling'
            }
        },

        // watch for files to change and run tasks when they do
        watch: {
            sass: {
                files: ['assets/css/**/*.{scss,sass}'],
                tasks: ['sass']
            }
        },

        // sass (libsass) config
        sass: {
            options: {
                sourceMap: true,
                relativeAssets: false,
                outputStyle: 'compressed',
                sassDir: 'assets/css',
                cssDir: '_site/assets/css'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'assets/css/',
                    src: ['**/*.{scss,sass}'],
                    dest: '_site/assets/css',
                    ext: '.css'
                }]
            }
        },

        // run tasks in parallel
        concurrent: {
            serve: [
                'sass',
                'watch',
                'shell:jekyllServe'
            ],
            options: {
                logConcurrentOutput: true
            }
        },

    });

    // Register the grunt serve task
    grunt.registerTask('serve', [
        'concurrent:serve',
        'sass'
    ]);

    // Register the grunt build task
    grunt.registerTask('build', [
        'shell:jekyllBuild',
        'sass'
    ]);

    // Register build as the default task fallback
    grunt.registerTask('default', 'build');

};
