dirs = {
    "css"        :  'public/css/',
    "sass"       :  'sass/',
    "handlebars" :  'routes/'
}

files = {
    dist : {
        "css"   :   dirs.css  + 'app.css',
    },
    build : {
        "sass"  :   dirs.sass + 'app.scss'    
    },
    "all" : {
        "sass"        : dirs.sass       + '/**/*.scss',
        "handlebars"  : dirs.handlebars + '/**/*.handlebars'
    }
}

var dirsCss = dirs.css;
var dirsScss = dirs.sass;
var dirsHandlebars = dirs.handlebars;

var filesDistCss = files.dist.css;
var filesBuildSass = files.build.sass;
var filesAllSass = files.all.sass;
var filesAllHandlebars = files.all.handlebars;


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
        watch: {
            source: {
                files: ['sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true, // needed to run LiveReload
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass']);
};