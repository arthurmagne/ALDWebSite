
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
	var Artist = Backbone.Model.extend({
    initialize: function(options) {
      console.log("init artist");
      if (options.name)
        this.name = options.name;

    },
		urlRoot: function() {
      if (this.name){
        return '/artist/byName/'+this.name;
      }
      return '/artist/';
    }
	});
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope
  return Artist;
  // What we return here will be used by other modules
});