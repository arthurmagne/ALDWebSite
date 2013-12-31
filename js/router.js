// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/oeuvreList',
  'views/addOeuvre',
  'views/home'
], function($, _, Backbone, OeuvreListView, AddOeuvreView, HomeView){
  var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'new': 'addOeuvre',
        'oeuvres': 'oeuvresList'
    },
    initialize: function() {
    	$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
       		 options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
   		 });
    }
  });

  var initialize = function(){


    var app_router = new AppRouter;

    app_router.on('route:home', function() {
      console.log("route: home");
      homeView = new HomeView();
      homeView.render();
    });

    app_router.on('route:addOeuvre', function() {
      console.log("route: addOeuvre");
      addOeuvre = new AddOeuvreView();
      addOeuvre.render();
    });

    app_router.on('route:oeuvresList', function() {
      console.log("route: oeuvresList");
      oeuvresList = new OeuvreListView();
      oeuvresList.render();
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});