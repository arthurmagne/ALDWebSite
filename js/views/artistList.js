define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/artistList.html',
  'collections/oeuvres'
], function($, _, Backbone, artistsTemplate, Oeuvres){
  var ArtistList = Backbone.View.extend({
    el: '#page',
    render: function () {
      var that = this;
      // A remplacer par les artistes
      var oeuvres = new Oeuvres();
      
      // on récupère les oeuvres en fetchant
      oeuvres.fetch({
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