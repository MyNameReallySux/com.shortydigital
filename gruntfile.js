module.exports = function(grunt) {
    grunt.initConfig ({
        sass: {
            dist: {
                files: 
                {
                    'public/css/app.css' : 'sass/app.scss'
                }
            }
        }, 
        cssbeautifier : {
            files : ["public/**/*.css"],
            options : {
                indent: '    ',
                openbrace: 'end-of-line',
                autosemicolon: true
            }
        },
        watch: {
            source: {
                files: ['sass/**/*.scss', 'routes/**/*.handlebars'],
                tasks: ['sass', 'cssbeautifier'],
                options: {
                    livereload: false, // needed to run LiveReload
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-cssbeautifier');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass', 'cssbeautifier']);
};