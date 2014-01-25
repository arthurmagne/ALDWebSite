// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/oeuvreList',
  'views/editOeuvre',
  'views/editArtist',
  'views/home',
  'views/artistList',
  'views/detailArtist',
  'views/detailOeuvre'
  ], function($, _, Backbone, OeuvreListView, EditOeuvreView, EditArtistView, HomeView, ArtistListView, DetailArtistView, DetailOeuvreView){
  var AppController = Backbone.View.extend({
    showView: function(options){
      var closingView = this.view;

      this.view = options.view;
      console.log("l'id recup dans options : "+options.id);
      this.view.render({id: options.id});
      //$(this.view.el).hide();
      //this.el.append(this.view.el);

      this.openView(this.view);
      this.closeView(closingView);
    },
     openView: function(view){

    },

    closeView: function(view){
      if (view){
        view.unbind();
        view.remove();
        
      }
    }
  });
  var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'new': 'editOeuvre',
        'newArtist': 'editArtist',
        'editArtwork/:id': 'editOeuvre',
        'oeuvres': 'oeuvresList',
        'oeuvres/type/:type': 'oeuvresListByType',
        'artists': 'artistList',
        'artist/:id': 'detailArtist',
        'artist/byName/:name': 'detailArtistByName',
        'editArtist/:id': 'editArtist',
        'oeuvre/:id': 'detailOeuvre',
        'oeuvre/byArtist/:id': 'oeuvreListByArtist',
        'oeuvre/byArtistName/:name': 'oeuvreListByArtistName',
        'oeuvre/byTag/:tag': 'oeuvreListByTag',
        'oeuvres/technique/:type': 'oeuvresListByTechnique'

    },
    initialize: function() {
    	$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
     		 //options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
         options.url = 'http://localhost:8080/rest/museum' + options.url;
         if (!options.crossDomain) {
            options.crossDomain = true;
         };
         
        //jqXHR.setRequestHeader('Accept", "application/json');

 		  });
      var appController = new AppController();
      this.appController = appController;
      /*$.ajaxSetup({
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'origin, x-requested-with, content-type',
          'Access-Control-Allow-Methods':'PUT, GET, POST, DELETE, OPTIONS'
        }
      });*/
    }
  });

  var initialize = function(){


    var app_router = new AppRouter;

    app_router.on('route:home', function() {
      console.log("route: home");
      homeView = new HomeView();
      homeView.render();
    });

    app_router.on('route:editOeuvre', function(id) {
      console.log("route: editOeuvre");
      editOeuvre = new EditOeuvreView();
      editOeuvre.render({id: id});
      //this.appController.showView({view: editOeuvre, id: id});

    });

    app_router.on('route:editArtist', function(id) {
      console.log("route: editArtist");
      editArtist = new EditArtistView();
      editArtist.render({id: id});
    });

    app_router.on('route:oeuvresList', function() {
      console.log("route: oeuvresList");
      oeuvresList = new OeuvreListView();
      oeuvresList.render();
    });

    app_router.on('route:oeuvresListByType', function(type) {
      console.log("route: oeuvresListByType "+type);
      oeuvresListByType = new OeuvreListView();
      oeuvresListByType.render({type: type});
    });

    app_router.on('route:oeuvresListByTechnique', function(technique) {
      console.log("route: oeuvresListByTechnique "+technique);
      oeuvresListByTechnique = new OeuvreListView();
      oeuvresListByTechnique.render({technique: technique});
    });

    app_router.on('route:oeuvreListByArtist', function(id) {
      console.log("route: oeuvreListByArtist "+id);
      oeuvreListByArtist = new OeuvreListView();
      oeuvreListByArtist.render({id: id});
    });

    app_router.on('route:oeuvreListByArtistName', function(name) {
      console.log("route: oeuvreListByArtistName "+name);
      oeuvreListByArtistName = new OeuvreListView();
      oeuvreListByArtistName.render({name: name});
    });

    app_router.on('route:oeuvreListByTag', function(tag) {
      console.log("route: oeuvreListByTag "+tag);
      oeuvreListByTag = new OeuvreListView();
      oeuvreListByTag.render({tag: tag});
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

    app_router.on('route:detailArtistByName', function(name) {
      console.log("route: detailArtistByName");
      detailArtistByName = new DetailArtistView();
      detailArtistByName.render({name: name});
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
        }else if (routeName == "editArtist"){
          $('.navbar-wrapper li.artistList').addClass('active');
        }else{
          $('.navbar-wrapper li.oeuvres').addClass('active');
        }
      }
    });

    Backbone.View.prototype.goTo = function (loc) {
      app_router.navigate(loc, true);
      console.log("call proto");
    };
    console.log("initialize");

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});