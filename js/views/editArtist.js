define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/editArtist.html',
  'models/artist',
  '../router',
  'views/home'
], function($, _, Backbone, editArtistTemplate, Artist, router, HomeView){
  var EditArtist = Backbone.View.extend({
    el: '#page',
    events: {
      'submit .add-artist-form': 'saveArtist',
      'click .delete-artist': 'deleteArtist'
    },
    render: function (options) {
      var that = this;
      if (options.id){
        this.edit = true;
        this.id = options.id;
        console.log("on a un id");
        this.artist = new Artist({id: options.id});
        // on récupère les artists en fetchant GET request
        this.artist.fetch({
          success: function (artist) {
            var template = _.template(editArtistTemplate, {artist: artist});
            $('#myCarousel').addClass('hide');
            that.$el.html(template);
          }
        });
      }else{
        console.log("pas did");
        var template = _.template(editArtistTemplate, {artist: null});
        $('#myCarousel').addClass('hide');
        that.$el.html(template);
      }
    },
    saveArtist: function (event) {

      console.log("saveArtist");
      //var artistDetails = $(event.currentTarget).serializeObject();
      var form = $(event.currentTarget)
      var _name = form.find("input[name='title']").val();
      var _city = form.find("input[name='city']").val();
      var _nationality = form.find("input[name='nationality']").val();
      var _photo = form.find("input[name='photo']").val();
      var _date = form.find("input[name='date']").val();
      var _desc = form.find("textarea[name='description']").val();
      var _type = form.find("select[name='type'] option:selected").val();
      var _id;
      if (this.edit == true){
        console.log("isModifiiiii");
        _id = parseInt(form.find("input[name='id']").val());
        console.log("avec"+ _id);
      }else{
        console.log("UNDEF");

        _id = 'undefined';
      }


      var artistDetailsVar = {
        artist: {
          birthDate: _date,
          city: _city,
          name: _name,
          nationality: _nationality,
          photo: _photo,
          type: _type,
          description: _desc,
          id: _id
        }
      };
      that = this;
      console.log(artistDetailsVar);
      var artist = new Artist({artist: artistDetailsVar, id: _id});
      var homeView = new HomeView();
      artist.save(artistDetailsVar,{
        wait: true,
        success: function (artist){
          console.log("Artist push au serveur avec succès");
          console.log(artist);
          //Backbone.history.navigate('/#/', {trigger: true});
          $('#myCarousel').removeClass('hide');
          Backbone.View.prototype.goTo('/#/');
          that.close();
          //that.unbind();
          //that.remove();
        }
      });
      return false;
    },

    deleteArtist: function (event) {
      console.log("deleteArtist");
      var artist = new Artist({id: this.id});
      artist.destroy({
        success: function () {
          console.log("Artist supprimée du serveur avec succès");
          //Backbone.history.navigate('/#/', {trigger: true});
          $('#myCarousel').removeClass('hide');
          Backbone.View.prototype.goTo('/#/');
          that.close();

        }
      })
      return false;
    },
    close: function(){
      $(this.el).unbind();
      $(this.el).empty();
    }
    
  });

  // Our module now returns our view
  return EditArtist;
});