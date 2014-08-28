/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    eslint: {
      target: ['src/*.js'],
      options: {
        config: '.eslintrc'
      }
    },
    jscs: {
        src: ['src/*.js'],
        options: {
            config: '.jscsrc'
        }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.pcextreme.nl',
          port: 21,
          authKey: 'gloey.nl'
        },
        src: 'dist',
        dest: '/domains/gloey.nl/htdocs/www/apps/flex'
      }
    },
    exec: {
      clean: 'rm -rf ./dist',
      run: 'webpack',
      minify: 'webpack --minify'
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-exec');

  // Default task.
  grunt.registerTask('default', ['eslint', 'jscs', 'exec:run']);
  grunt.registerTask('deploy', ['eslint', 'jscs', 'exec:clean', 'exec:minify', 'ftp-deploy']);
};
