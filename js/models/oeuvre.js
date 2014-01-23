
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
	var Oeuvre = Backbone.Model.extend({

    initialize: function(options) {
      console.log("init oeuvre");
      if (options.addComment)
        this.addComment = options.addComment;

    },
    urlRoot: function() {
      console.log("URL root");
      if (this.addComment){
        console.log("add comment url");
        return '/artwork/addComment/';
      }
      return '/artwork/';
    }
	})
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope
  return Oeuvre;
  // What we return here will be used by other modules
});