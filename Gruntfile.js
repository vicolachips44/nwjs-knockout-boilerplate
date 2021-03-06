/*global module:false*/
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({});
  grunt.config('shell', {
    build: {
      command: [
        'rm -rf distrib',
        'mkdir distrib',
        'cp src/index.html distrib/',
        'cp -r src/css distrib/',
        'cp -r src/fonts distrib/',
        'cp src/package.json distrib/'
      ].join('&&')
    },
    cpcss: {
      command: [
        'rm -rf src/css',
        'mkdir src/css',
        'cp src/vendor/bootstrap/dist/css/bootstrap.min.css src/css',
        'cp -r src/vendor/bootstrap/dist/fonts src/fonts'
      ].join('&&')
    }
  });

  grunt.config('htmlmin', {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: [{
        expand: true,
        cwd: 'src/templates',
        src: '**/*.html',
        dest: 'distrib/templates'
      }]
    }
  });

  grunt.config('jshint', {
    options: {
      curly: true,
      eqeqeq: true,
      eqnull: true,
      browser: true,
      globals: {
        jQuery: true,
        define: true,
        requirejs: true
      }
    },
    all: ['Gruntfile.js', 'src/js/**/*.js']
  });

  grunt.config('jscs', {
    options: {
      config: '.jscs.json'
    },
    src: ['Gruntfile.js', 'src/js/**/*.js']
  });

  grunt.config('requirejs', {
    compile: {
      options: {
        name: 'app',
        baseUrl: 'src/js',
        mainConfigFile: 'src/js/require-config.js',
        out: 'distrib/js/bootloader.js',
        preserveLicenseComments: false,
        include: ['../vendor/requirejs/require', 'require-config.js']
        // optimize: 'none'
      }
    }
  });

  grunt.registerTask('init', ['shell:cpcss']);
  grunt.registerTask('default', ['jshint', 'jscs', 'shell:build', 'requirejs:compile', 'htmlmin:dist']);

};
