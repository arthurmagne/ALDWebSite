define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/oeuvreList.html',
  'collections/oeuvres'
], function($, _, Backbone, oeuvresListTemplate, Oeuvres){
  var OeuvreList = Backbone.View.extend({
    el: '#page',
    render: function (options) {
      var that = this;
      var oeuvres = new Oeuvres({type: options.type});
      
      // on récupère les oeuvres en fetchant
      oeuvres.fetch({
        success: function (oeuvres) {
          var template = _.template(oeuvresListTemplate, {oeuvres: oeuvres.models});
          $('#myCarousel').addClass('hide');
          that.$el.html(template);
        }
      })
    }
  });

  // Our module now returns our view
  return OeuvreList;
});