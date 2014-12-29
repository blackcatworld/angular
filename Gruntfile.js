module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      dist: {
        files: ['*', 'app/*', 'app/js/*.js','app/js/controllers/*.js','app/js/directives/*.js','app/js/services/*.js', 'app/css/*.css', 'app/**/*.htm', 'app/**/*.html'],
        //tasks: [''],

        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          hostname: '0.0.0.0',
          base: 'app'
        }
      }
    },

    copy: {
      bower: {
        files: [
          {
            expand: true, 
            flatten: true,
            src: ['bower_components/angular/angular.min.js',
                  'bower_components/angular/angular.min.js.map',
                  'bower_components/angular-route/angular-route.min.js',
                  'bower_components/angular-route/angular-route.min.js.map',
                  'bower_components/bootstrap/dist/js/bootstrap.min.js',
                  'bower_components/jquery/dist/jquery.min.js',
                  'bower_components/jquery/dist/jquery.min.map',
                  'bower_components/requirejs/require.js',
                  'bower_components/moment/min/moment.min.js',
                  'bower_components/angular-moment/angular-moment.min.js',
                  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                  'bower_components/highcharts/highcharts-more.js',
                  'bower_components/highcharts-ng/dist/highcharts-ng.min.js'
            ],
            dest: 'app/lib'
          },
          
          {
            expand: true, 
            flatten: true,
            src: ['bower_components/bootstrap/dist/css/bootstrap.min.css', 
                  'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                  'bower_components/bootstrap/dist/fonts'],
            dest: 'app/css'
          },
            {
                expand: true,
                flatten: true,
                src: ['bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
                    'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
                    'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
                    'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'],

                dest: 'app/fonts'
            }
          
        ]
      }
    },
      recess: {
          dist: {
              options: {
                  compile: true
              },
              files: {
                  'app/css/main.css': ['less/custom.less']
              }
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-recess');

  grunt.registerTask('default', ['copy', 'connect', 'watch']);
  grunt.registerTask('compile', ['recess']);
};