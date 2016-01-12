/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    eslint: {
      target: ['src/**/*.js'],
      options: {
        config: '.eslintrc'
      }
    },
    jscs: {
      src: ['src/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },
    lesslint: {
      src: ['src/styles/styles.less'],
      options: {
        imports: ['**/*.less'],
        csslint: {
          csslintrc: '.csslintrc'
        }
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
    includes: {
      files: {
        src: ['examples/index.html'],
        dest: 'examples/out/index.html',
        flatten: true,
        cwd: '.',
        options: {
          //silent: true
        }
      }
    },
    exec: {
      'build': 'webpack -d',
      'open': 'open dist/index.html',
      'clean': 'rm -rf ./dist',
      'serve': 'webpack-dev-server -d --inline --reload=localhost --host=localhost',
      'open-serve': 'open http://localhost:8080'
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-includes');

  // Default task.
  grunt.registerTask('lint', ['eslint', 'jscs', 'lesslint']);
  grunt.registerTask('examples', ['includes']);
  grunt.registerTask('build', ['examples', 'exec:build']);
  grunt.registerTask('open', ['exec:open']);
  grunt.registerTask('clean', ['exec:clean']);
  grunt.registerTask('serve', ['exec:open-serve', 'exec:serve']);
  grunt.registerTask('open-serve', ['exec:open-serve']);
  grunt.registerTask('deploy', ['lint', 'clean', 'build', 'ftp-deploy']);
  grunt.registerTask('default', ['lint', 'build']);
};
