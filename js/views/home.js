define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/home.html',
  'models/oeuvres'
], function($, _, Backbone, homeTemplate, Oeuvres){
  var OeuvreList = Backbone.View.extend({
    el: '#page',
    render: function () {
      var that = this;
      var oeuvres = new Oeuvres();
      
      // on récupère les oeuvres en fetchant
      oeuvres.fetch({
        success: function (oeuvres) {
          var template = _.template(homeTemplate, {oeuvres: oeuvres.models});
          that.$el.html(template);
        }
      })
    }
  });

  // Our module now returns our view
  return OeuvreList;
});