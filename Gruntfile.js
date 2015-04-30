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
        'cp src/package.json distrib/',
      ].join('&&')
    },

    cpcss: {
      command: [
        'rm -rf src/css',
        'mkdir src/css',
        'cp src/vendor/bootstrap/dist/css/bootstrap.min.css src/css',
        'cp -r src/vendor/bootstrap/dist/fonts src/fonts',
      ].join('&&')
    },
  });

  grunt.config('requirejs', {
    compile: {
      options: {
        name: 'app',
        baseUrl: "src/js",
        mainConfigFile: "src/js/require-config.js",
        out: "distrib/js/bootloader.js",
        include: ['../vendor/requirejs/require', 'require-config.js'],
        optimize: 'none'
      }
    }
  });

  grunt.registerTask('init', ['shell:cpcss']);
  grunt.registerTask('default', ['shell:build', 'requirejs:compile']);

};
