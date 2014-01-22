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
    render: function () {
      var that = this;
      var artists = new Artists();
      
      // on récupère les artists en fetchant
      artists.fetch({
        success: function (artists) {
          var template = _.template(artistsTemplate, {artists: artists.models});
          $('#myCarousel').addClass('hide');
          that.$el.html(template);
        }
      })
    }
  });

  // Our module now returns our view
  return ArtistList;
});