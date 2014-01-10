// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/oeuvreList',
  'views/addOeuvre',
  'views/home',
  'views/artistList',
  'views/detailArtist',
  'views/detailOeuvre'
], function($, _, Backbone, OeuvreListView, AddOeuvreView, HomeView, ArtistListView, DetailArtistView, DetailOeuvreView){
  var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'new': 'addOeuvre',
        'oeuvres': 'oeuvresList',
        'artists': 'artistList',
        'artist/:id': 'detailArtist',
        'oeuvre/:id': 'detailOeuvre'
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

    app_router.on('route:artistList', function() {
      console.log("route: artistList");
      artistList = new ArtistListView();
      artistList.render();
    });

    app_router.on('route:detailArtist', function(id) {
      console.log("route: detailArtist");
      detailArtist = new DetailArtistView();
      detailArtist.render({id: id});
    });

    app_router.on('route:detailOeuvre', function(id) {
      console.log("route: detailOeuvre");
      detailOeuvre = new DetailOeuvreView();
      detailOeuvre.render({id: id});
    });

    app_router.bind('all', function(route, router) {
      if (route != 'route'){
        var routeName = route.split(':')[1];
        $('.navbar-wrapper li').removeClass('active');
        if (routeName == "artistList" || routeName == "collections" || routeName == "home"){
          $('.navbar-wrapper li.' + routeName).addClass('active');
        }else{
          $('.navbar-wrapper li.oeuvres').addClass('active');
        }
      }
    });

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});