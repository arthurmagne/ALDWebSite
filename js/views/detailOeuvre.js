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
      var form = $('.comment-form');
      var _name = form.find("input[name='name-comment']").val();
      var _date = new Date().toDateString();
      var _desc = form.find("textarea[name='comment']").val();
      var _id = this.id;
      var that = this;
      
      var oeuvre = new Oeuvre({comment: {
        author: _name,
        content: _desc,
        postDate: _date
        },id: this.id, addComment: true});
              oeuvre.save({comment: {
        author: _name,
        content: _desc,
        postDate: _date
        }}
        ,{
        success: function (oeuvre){
          console.log("Oeuvre push au serveur avec nouveau commentaire avec succès");
          console.log(oeuvre);
          Backbone.View.prototype.goTo('/#/');
          $('#myCarousel').removeClass('hide');
          that.close();

        }});
      return false;
    },
    close: function(){
      $(this.el).unbind();
      $(this.el).empty();
    }

  });

  // Our module now returns our view
  return DetailOeuvre;
});