/**
 * Stage Object
 *
 * Depends on
 *   Base.js
 *   Class.js
 *   jQuery.js   
 * 
 */
(function (window, undefined) {

  var WarriorsWay = Class.extend({
    base_elements: {},
    init: function (options) {
      var my = this;

      // Default options
      this.options = {        
        id: uniq_id(),
        name: 'WarriorsWay',
        playGround: playGround,
        move: function(){}
      }

      // Merge options
      $.extend( this.options, options || {} );

      this.playGround = this.options.playGround;

      // Create/Load Canvas
      this.load();
    },

    // Load event on playGround
    load: function () {
      var my = this;
      
      console.info(this.options)

      my.build_base();
    },

    // Build Start & End
    build_base: function() {
      var my = this;

      // console.info(this.options['end'])

      ['start', 'end'].forEach(function(type){

        console.info(type, )

        my.base_elements[type] = {} 
        my.base_elements[type]['sprite'] = new createjs.SpriteSheet(this.options[type].sprite);
        my.base_elements[type]['sequence'] = new createjs.BitmapAnimation(my.base_elements[type]['sprite']);

        // Append Element to PlayGround
        this.playGround.addChild(my.base_elements[type]['sequence']);

      });


    }

  });

  window.WarriorsWay = WarriorsWay;
} (window));