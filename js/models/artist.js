
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
	var Artist = Backbone.Model.extend({
		urlRoot: '/artist/'
	})
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope
  return Artist;
  // What we return here will be used by other modules
});