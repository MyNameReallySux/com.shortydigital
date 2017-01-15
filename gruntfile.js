module.exports = function(grunt) {
    grunt.initConfig ({
        sass: {
            dist: {
                files: 
                {
                    'build/build.css' : 'sass/app.scss'
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
        concat: {
            vendorjs: {
                src: ['node_modules/jquery/dist/jquery.js', 
                      'node_modules/owl.carousel/dist/owl.carousel.js',
                      'vendor/highlight/highlight.pack.js'],
                dest: 'public/js/vendors.js',
            },
            vendorcss: {
                src: ['node_modules/owl.carousel/dist/assets/owl.carousel.css', 'node_modules/owl.carousel/dist/assets/owl.theme.default.css'],
                dest: 'public/css/vendors.css',
            },  
            concatjs: {
                src: ['javascript/**/*.js'],
                dest: 'build/build.js',
            },
            copycss: {
                src: ['build/**/*.css'],
                dest: 'public/css/app.css',
            },
            copyjs: {
                src: ['build/**/*.js'],
                dest: 'public/js/app.js',
            }
        },
        watch: {
            source: {
                files: ['sass/**/*.scss', 'routes/**/*.handlebars', 'javascript/**/*.js'],
                tasks: ['sass', 'cssbeautifier', 'concat'],
                options: {
                    livereload: false, // needed to run LiveReload
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-cssbeautifier');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass', 'cssbeautifier', 'concat']);
};