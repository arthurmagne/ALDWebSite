
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
	var Oeuvres = Backbone.Collection.extend({
    initialize: function(options) {
      if (options)
        this.type = options.type;
    },
    url: function() {
      if (!this.type)
        return '/artwork/get/all';
      return '/artwork/get/byType/' + this.type;
    }
  });
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope
  return Oeuvres;
  // What we return here will be used by other modules
});