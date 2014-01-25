define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!../../templates/editOeuvre.html',
  'models/oeuvre',
  '../router',
  'collections/artists'
], function($, _, Backbone, addOeuvreTemplate, Oeuvre, router, Artists){
  $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };

  var EditOeuvre = Backbone.View.extend({
    el: '#page',
    events: {
      'submit .add-oeuvre-form': 'saveOeuvre',
      'click .delete-oeuvre': 'deleteOeuvre'
    },
    render: function (options) {
      var that = this;
      var artistsCollection = new Artists();
      var artistList;

      artistsCollection.fetch({
        success: function (artists) {
          that.artistList = artists.models;
          console.log("artists fetch "+that.artistList);
          if (options.id){
            that.edit = true;
            that.id = options.id;
            console.log("on a un id");
            // on récupère la liste des artistes
            

            that.oeuvre = new Oeuvre({id: options.id});
            // on récupère les oeuvres en fetchant GET request
            that.oeuvre.fetch({
              success: function (oeuvre) {
                var template = _.template(addOeuvreTemplate, {oeuvre: oeuvre});
                $('#myCarousel').addClass('hide');
                that.$el.html(template);
              }
            });
          }else{
            console.log("pas did");
            console.log("artistList : "+that.artistList);
            var template = _.template(addOeuvreTemplate, {artists: that.artistList});
            $('#myCarousel').addClass('hide');
            that.$el.html(template);
          }
        }
      });
      
    },
    saveOeuvre: function (event) {
      console.log("saveOeuvre");
      //var oeuvreDetails = $(event.currentTarget).serializeObject();
      var form = $(event.currentTarget);
      var _title = form.find("input[name='title']").val();
      var _photos = form.find("input[name='photos']").val();
      console.log("photos :    dd "+_photos);
      var _exposed = form.find("input[name='exposed']:checked").val();
      var _date = form.find("input[name='date']").val();
      var _desc = form.find("textarea[name='description']").val();
      var _type = form.find("select[name='type'] option:selected").val();
      var _technique = form.find("select[name='technique'] option:selected").val();
      var _support = form.find("select[name='support'] option:selected").val();
      var _dimX = form.find("input[name='dimX']").val();
      var _dimY = form.find("input[name='dimY']").val();
      var _dimZ = form.find("input[name='dimZ']").val();
      var _tags = form.find("input[name='tags']").val();
      var _id;

      if (this.edit == true){
        _id = parseInt(form.find("input[name='id']").val());
        console.log("id pour modif "+ _id);
      }else{
        console.log("UNDEF");

        _id = 'undefined';
      }
      var that = this;

      var artist = form.find("select[name='artist'] option:selected").val();
      console.log("artist : " + artist);

      var _tagsTab = _tags.split(',');
      console.log(_tagsTab);
      var oeuvreDetailsVar = {
        artwork: {
          artistName: artist,
          creationDate: _date,
          description: _desc,
          dimensions: {
              x: parseInt(_dimX),
              y: parseInt(_dimY),
              z: parseInt(_dimZ)
          },
          exposed: _exposed,
          photos: _photos,
          support: _support,
          tags: {
              tags: _tagsTab
          },
          technique: _technique,
          title: _title,
          type: _type,
          id: _id
        }
      };

      console.log(oeuvreDetailsVar);
      var oeuvre;
      if (_id == "undefined"){
        oeuvre = new Oeuvre({artwork: oeuvreDetailsVar});
      }else{
        oeuvre = new Oeuvre({artwork: oeuvreDetailsVar, id: _id});
      }
      oeuvre.save(oeuvreDetailsVar ,{
        wait: true,
        success: function (oeuvre){
          console.log("Oeuvre push au serveur avec succès");
          console.log(oeuvre);
          $(that.el).empty();
          if (that.edit == true){
            $(that.el).html("<h2 class='text-center text-muted add-feedback'>Oeuvre modifiée avec succès</h2><hr>");
          }else{
            $(that.el).html("<h2 class='text-center text-muted add-feedback'>Oeuvre ajoutée avec succès</h2><hr>");
          }
          setTimeout(function(){
            $('#myCarousel').removeClass('hide');
            Backbone.View.prototype.goTo('/#/');
            that.close();
          },2000);
        }
      });
      return false;
    },

    deleteOeuvre: function (event) {
      console.log("deleteOeuvre");
      var that = this;

      var oeuvre = new Oeuvre({id: this.id});
      oeuvre.destroy({
        success: function () {
          console.log("Oeuvre supprimée du serveur avec succès");
          $(that.el).empty();
          $(that.el).html("<h2 class='text-center text-muted add-feedback'>Oeuvre supprimée avec succès</h2><hr>");
          setTimeout(function(){
            $('#myCarousel').removeClass('hide');
            Backbone.View.prototype.goTo('/#/');
            that.close();
          },2000);
        }
      });
      return false;
    },
    close: function(){
      $(this.el).unbind();
      $(this.el).empty();
    }

    
    
  });

  // Our module now returns our view
  return EditOeuvre;
});