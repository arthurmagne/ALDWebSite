
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
	var Artists = Backbone.Collection.extend({
		initialize: function(options) {

      if (options){
        this.name = options.name;
        this.city = options.city;
        this.nationality = options.nationality;
        this.bool = options.bool;
      }
    },
    url: function() {
      if (this.name){
        return '/artist/listByName/' + this.name;
      }else if (this.city){
        return '/artist/byCity/' + this.city;
      }else if (this.nationality){
        return '/artist/byNationality/' + this.nationality;
      }else if (this.bool){
        return '/artist/represented';
      }
      return '/artist/all';
    }
	})
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope
  return Artists;
  // What we return here will be used by other modules
});