module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clean the release directories
    clean: {
      release: ['js/', 'css/', 'index.html'],
      postrelease: ['dest/', 'combined.css', 'combined.js']
    },

    // concatenate the CSS and JS files into one combined file

    concat: {
      css: {
        src: ['app/css/*.css'],
        dest: 'combined.css'
      },
      js: {
        src: [
          'app/js/jquery.min.js',
          'app/js/typed.min.js',
          'app/js/load_avatar.js',
        ],
        dest: 'combined.js'
      }
    },

    // minify the CSS file
    cssmin: {
      dist: {
        files: {
          'combined.min.css': ['combined.css']
        }
      }
    },

    // minify the JS file
    uglify: {
      build: {
        src: ['combined.js'],
        dest: 'combined.min.js'
      }
    },

    processhtml: {
      // options: {
      //   data: {
      //     message: 'Hello world!'
      //   }
      // },
      dist: {
        files: {
          'dest/index.html': ['app/index.html']
        }
      }
    },

    // minify the HTML files

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        files: [{
          expand: true,
          cwd: 'dest/',
          src: ['*.html'],
          dest: '.'
        }]
      }
    },

    concurrent: {
      target1: ['newer:concat:css', 'newer:concat:js', 'newer:cdnify'],
      target2: ['newer:includereplace'],
      target3: ['newer:htmlmin:dist', 'newer:cssmin:add_banner', 'newer:uglify']
    }
  });

  grunt.registerTask('default', [
    'clean:release',
    'concat:css',
    'concat:js',
    'processhtml:dist',
    'htmlmin:dist',
    'cssmin:dist',
    'uglify:build',
    'clean:postrelease'
  ]);

};
