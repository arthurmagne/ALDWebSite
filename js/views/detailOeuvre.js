define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/detailOeuvre.html',
  'models/oeuvre'
], function($, _, Backbone, detailOeuvreTemplate, Oeuvre){
  var DetailOeuvre = Backbone.View.extend({
    el: '#page',
    render: function (options) {
      if (!options.id){
          $('#myCarousel').addClass('hide');
          this.$el.html("L'url ne contient pas d'id");
      }else{
        var that = this;
        var oeuvre = new Oeuvre({id: options.id});
        // on récupère l'artiste depuis le serveur
        oeuvre.fetch({
          success: function (oeuvre) {
            var template = _.template(detailOeuvreTemplate, {oeuvre: oeuvre});
            $('#myCarousel').addClass('hide');
            that.$el.html(template);
          }
        })
      }
    }
  });

  // Our module now returns our view
  return DetailOeuvre;
});