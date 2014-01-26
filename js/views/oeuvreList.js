define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/oeuvreList.html',
  'collections/oeuvres',
  'models/artist'
], function($, _, Backbone, oeuvresListTemplate, Oeuvres, Artist){
  var OeuvreList = Backbone.View.extend({
    el: '#page',
    render: function (options) {
      var that = this;
      if (options){
        if (options.type){
          var oeuvres = new Oeuvres({type: options.type});
          console.log("On a un type");
          // on récupère les oeuvres en fetchant
          oeuvres.fetch({
            success: function (oeuvres) {
              var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
              if (options.type == "PAINTING")
                $('#painting-list').removeClass('hide');
            }
          });
        }else if (options.id){
          console.log("On a un id");
          // on récupere l'artiste associé et on récupère son nom
          var artist = new Artist({id: options.id});
          artist.fetch({
            success: function (artist) {
              console.log(" artist récup :" + artist.attributes.artist.name);
              // on récupère les oeuvres en fetchant
            var oeuvres = new Oeuvres({name: artist.attributes.artist.name});
            oeuvres.fetch({
              success: function (oeuvres) {
                var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
                $('#myCarousel').addClass('hide');
                that.$el.html(template);
              }
            });
            }
          });
        }else if (options.tag){
          console.log("On a un tag");
          var oeuvres = new Oeuvres({tag: options.tag});
          // on récupère les oeuvres en fetchant
          oeuvres.fetch({
            success: function (oeuvres) {
              var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }else if (options.name){
          console.log("On a un name");
          var oeuvres = new Oeuvres({name: options.name});
          oeuvres.fetch({
            success: function (oeuvres) {
              var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }else if (options.technique){
          var oeuvres = new Oeuvres({technique: options.technique});
          console.log("On a une technique");
          // on récupère les oeuvres en fetchant
          oeuvres.fetch({
            success: function (oeuvres) {
              var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }else if (options.support){
          var oeuvres = new Oeuvres({support: options.support});
          console.log("On a un support");
          // on récupère les oeuvres en fetchant
          oeuvres.fetch({
            success: function (oeuvres) {
              var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }else if (options.bool){
          var oeuvres = new Oeuvres({bool: true});
          console.log("Oeuvres representées");
          // on récupère les oeuvres en fetchant
          oeuvres.fetch({
            success: function (oeuvres) {
              var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }else if (options.oeuvreName){
          var oeuvres = new Oeuvres({oeuvreName: options.oeuvreName});
          console.log("Oeuvres par nom");
          // on récupère les oeuvres en fetchant
          oeuvres.fetch({
            success: function (oeuvres) {
              var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
              $('#myCarousel').addClass('hide');
              that.$el.html(template);
            }
          });
        }
      }else{
        console.log("On a rien");
        var oeuvres = new Oeuvres();
        // on récupère les oeuvres en fetchant
        oeuvres.fetch({
          success: function (oeuvres) {
            var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
            $('#myCarousel').addClass('hide');
            that.$el.html(template);
          }
        });
      }

      
      
    }
  });

  // Our module now returns our view
  return OeuvreList;
});