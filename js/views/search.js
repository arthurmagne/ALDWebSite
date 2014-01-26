define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'models/artist',
  'models/oeuvre',
  'collections/artists',
  'collections/oeuvres'
], function($, _, Backbone, detailArtistTemplate, Artist, Oeuvre, Artists, Oeuvres){
  var Search = Backbone.View.extend({
    el: '#search-form',
    events: {
      'submit .search-form': 'search'
    },
    render: function () {
      var that = this;
      console.log("search truc");
      
    },
    search: function (event) {
			event.preventDefault();
			event.stopPropagation();
      console.log("saveArtist");
      //var artistDetails = $(event.currentTarget).serializeObject();
      var form = $(event.currentTarget);
      var _selection = form.find("input[name='selection']:checked").val();
      var _title = form.find("input[name='title']").val();
      var _city = form.find("input[name='city']").val();
      var _nationality = form.find("input[name='nationality']").val();
      var _type = form.find("select[name='type'] option:selected").val();
      var _technique = form.find("select[name='technique'] option:selected").val();
      var _support = form.find("select[name='support'] option:selected").val();
      var _artistName = form.find("input[name='by-artist-name']").val();
      var _name = form.find("input[name='by-name']").val();
      var _tag = form.find("input[name='tag']").val();

	  	var that = this;
	  	console.log(_selection);
      switch (_selection) {
				case "nom":
					console.log("artist by name");
					that.navigate('artists/byName/'+_title);
					break;
				case "ville":
					console.log("by artist city");
					that.navigate('artists/byCity/'+_city);
					break;
				case "nationalite":
					console.log("by artist name");
					that.navigate('artists/byNationality/'+_nationality);
					break;
				case "represented-artist":
					console.log("by represented artist");
					that.navigate('artists/represented');
					break;
				case "type":
					console.log("oeuvre by type");
					that.navigate('oeuvres/type/'+_type);
					break;
				case "technique":
					console.log("oeuvre by technique");
					that.navigate('oeuvres/technique/'+_technique);
					break;
				case "support":
					console.log("oeuvre by support");
					that.navigate('oeuvres/support/'+_support);
					break;
        case "artist":
          console.log("oeuvre by artist name");
          that.navigate('oeuvre/byArtistName/'+_artistName);
          break;
        case "oeuvre-name":
          console.log("oeuvre by name");
          that.navigate('oeuvre/byName/'+_name);
          break;
				case "tag":
					console.log("oeuvre by tag");
					that.navigate('oeuvre/byTag/'+_tag);
					break;
				case "represented":
					console.log("represented oeuvre");
					that.navigate('oeuvres/represented');
					break;
			}
      //var artist = new Artist({artist: artistDetailsVar, id: _id});
      
      return false;
    },
    navigate: function(loc){
    	console.log("call navigate avec "+loc);
      $('#myCarousel').removeClass('hide');
      Backbone.View.prototype.goTo('#/'+loc);
      this.close();
    },

    close: function(){
    	$(".navbar-container").removeClass("show");
			$(".search-form-container").removeClass("show");
			$(".search-form-container").removeClass("disp");
      $(this.el).unbind();
    }
    
  });

  // Our module now returns our view
  return Search;
});