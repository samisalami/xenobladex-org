module.exports = function (grunt) {

  // Project configuration
  // For now no uglify, might be added later (or not implemented with Grunt)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      html: {
        files: [{
          expand: true,
          flatten: true,
          src: [
            'src/AppBundle/Resources/js/**/*.html'
          ],
          dest:'web/templates/'
        }]
      },
      images: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'src/AppBundle/Resources/images',
          src: [
            '**'
          ],
          dest:'web/images'
        }]
      },
      libraries: {
        files: [{
          flatten: false,
          expand: true,
          cwd: 'src/AppBundle/Resources/libraries',
          src: [
            '**'
          ],
          dest:'web/libraries'
        }]
      }
    },
    sass: {
      css: {
        options: {
          defaultEncoding: "utf-8",
          compass: true,
          style: 'nested',
          sourcemap: 'none'
        },
        files: {
          'web/css/main.css': 'src/AppBundle/Resources/scss/main.scss'
        }
      }
    },
    uglify: {
      js: {
        options: {
          sourceMap: true
        },
        files: {
          'web/js/main.min.js' : ['src/AppBundle/Resources/js/**/*.js']
        }
      }
    }
  });

  // Load plugins
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('uglify-fe', ['uglify:js']);
  grunt.registerTask('sass-fe', ['sass:css']);
  grunt.registerTask('copy-html', ['copy:html']);
  grunt.registerTask('all-fe', ['sass:css', 'uglify:js', 'copy:html']);
  grunt.registerTask('build', ['sass:css', 'uglify:js', 'copy:html', 'copy:images', 'copy:libraries']);

  //watch can usually not start two tasks parallel - it works with a function and defining the config explicit for watch
  grunt.registerTask('watch-fe', function(){
    var config = {
      options: {
        interrupt: true
      },
      html: {
        files: ['src/AppBundle/Resources/js/**/*.html'],
        tasks: ['copy:html']
      },
      images: {
        files: ['src/AppBundle/Resources/images/**'],
        tasks: ['copy:images']
      },
      css: {
        files: ['src/AppBundle/Resources/scss/*.scss'],
        tasks: ['sass:css'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/AppBundle/Resources/js/**/*.js'],
        tasks: ['uglify:js']
      }
    };
    grunt.config('watch', config);
    grunt.task.run('watch');
  });
};