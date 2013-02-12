/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        lint:  {
            files:['grunt.js', 'src/**/*.js', 'test/**/*.js']
        },
        qunit: {
            files:['test/**/*.html']
        },
        watch: {
            files: ['<config:lint.files>', 'src/**/*'],
            tasks: ['sass', 'connect']
        },
        jshint:{
            options:{
                curly:  true,
                eqeqeq: true,
                immed:  true,
                latedef:true,
                newcap: true,
                noarg:  true,
                sub:    true,
                undef:  true,
                boss:   true,
                eqnull: true,
                browser:true
            },
            globals:{
                jQuery:true
            }
        },
        sass: {
            dist: {
                files: {
                    'www/css/besserquizzer.css': 'src/scss/besserquizzer.scss'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 10081,
                    base: 'www',
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task.
    grunt.registerTask('default', ['lint', 'sass', 'connect']);

};
