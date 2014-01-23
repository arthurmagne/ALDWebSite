// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    bootstrap: '../dist/js/bootstrap.min',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    holder: 'holder',
    lightbox: 'libs/lightbox/lightbox'
  },

    shim: {
        bootstrap: {
          deps: ['jquery']
        },

        holder: {
          deps: ['jquery']
        },
      
    	  underscore: {
	        exports: '_'
	      },
        lightbox: {
          deps: ['jquery']
        },
        
        backbone: {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        }
    }

});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){

  // The "app" dependency is passed in as "App"
  App.initialize();
});