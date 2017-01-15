({
  baseUrl: './',
  name: 'mainPage',
  out: 'build.js',
  paths: {
    es6: "../node_modules/requirejs-babel/es6",
    babel: "../node_modules/requirejs-babel/babel-5.8.34.min",
    jquery: "../node_modules/jquery/dist/jquery"
  },
  config: {
    es6: {
      'resolveModuleSource': function(source) {
        return 'es6!'+source;
      }
    }
  },
  exclude: ['babel'],
  optimize: 'none',
  pragmasOnSave: {
    excludeBabel: true
  }
})
