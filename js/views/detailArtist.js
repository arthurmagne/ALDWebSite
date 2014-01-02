define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/detailArtist.html',
  'models/artist'
], function($, _, Backbone, detailArtistTemplate, Artist){
  var DetailArtist = Backbone.View.extend({
    el: '#page',
    render: function (options) {
      if (!options.id){
          $('#myCarousel').addClass('hide');
          this.$el.html("L'url ne contient pas d'id");
      }else{
        var that = this;
        var artist = new Artist({id: options.id});
        // on récupère l'artiste depuis le serveur
        artist.fetch({
          success: function (artist) {
            var template = _.template(detailArtistTemplate, {artist: artist});
            $('#myCarousel').addClass('hide');
            that.$el.html(template);
          }
        })
      }
    }
  });

  // Our module now returns our view
  return DetailArtist;
});