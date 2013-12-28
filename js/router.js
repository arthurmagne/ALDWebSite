// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/oeuvreList',
  'views/addOeuvre'
], function($, _, Backbone, OeuvreListView, AddOeuvreView){
  var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'new': 'addOeuvre'
    }
  });

  var initialize = function(){


	$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
    });


    var app_router = new AppRouter;
    app_router.on('route:home', function() {
      console.log("route: home");
      oeuvreList = new OeuvreListView();
      oeuvreList.render();
    });

    app_router.on('route:addOeuvre', function() {
      console.log("route: addOeuvre");
      addOeuvre = new AddOeuvreView();
      addOeuvre.render();
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});