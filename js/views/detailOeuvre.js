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
    events: {
      'click .add-comment': 'addComment',
      'click .submit-comment': 'submitComment'
    },
    render: function (options) {
      if (!options.id){
          $('#myCarousel').addClass('hide');
          this.$el.html("L'url ne contient pas d'id");
      }else{
        var that = this;
        this.id = options.id;
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
    },
    addComment: function (event) {
      event.preventDefault();
      console.log("add comment");
      $('.comment-form').removeClass('hide');
      $('.add-comment').addClass('hide');
      return false;
    },
    submitComment: function (event) {
      event.preventDefault();
      console.log("submit comment");
      var oeuvre = new Oeuvre({id: this.id});
      oeuvre.save({artwork:{comments: {
comments: [
{
author: "arthur",
content: "blabla",
postDate: "2014-01-21T20:40:22.409+01:00"
}]}}},{
        success: function (oeuvre){
          console.log("Oeuvre push au serveur avec nouveau commentaire avec succès");
          console.log(oeuvre);
          Backbone.history.navigate('/#/', {trigger: true});
          $('#myCarousel').removeClass('hide');

        }});
      return false;
    }

  });

  // Our module now returns our view
  return DetailOeuvre;
});