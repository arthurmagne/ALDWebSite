define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/artistList.html',
  'collections/artists'
], function($, _, Backbone, artistsTemplate, Artists){
  var ArtistList = Backbone.View.extend({
    el: '#page',
    render: function (options) {
      var that = this;
      if (options){
        if (options.city) {
          console.log("artists avec city");
          var artists = new Artists({city: options.city});
        
          // on récupère les artists en fetchant
          artists.fetch({
            success: function (artists) {
              var template = _.template(artistsTemplate, {artists: artists.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }else if (options.nationality) {
          console.log("artists avec nationality");
          var artists = new Artists({nationality: options.nationality});
        
          // on récupère les artists en fetchant
          artists.fetch({
            success: function (artists) {
              var template = _.template(artistsTemplate, {artists: artists.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }else if (options.name) {
          console.log("artists avec name");
          var artists = new Artists({name: options.name});
        
          // on récupère les artists en fetchant
          artists.fetch({
            success: function (artists) {
              var template = _.template(artistsTemplate, {artists: artists.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }else if (options.bool) {
          console.log("artists représentés");
          var artists = new Artists({bool: true});
        
          // on récupère les artists en fetchant
          artists.fetch({
            success: function (artists) {
              var template = _.template(artistsTemplate, {artists: artists.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }
      }else{
        var artists = new Artists();
        
        // on récupère les artists en fetchant
        artists.fetch({
          success: function (artists) {
            var template = _.template(artistsTemplate, {artists: artists.models});
            $('#myCarousel').addClass('hide');
            that.$el.html(template);
          }
        });
      }
    }
  });

  // Our module now returns our view
  return ArtistList;
});