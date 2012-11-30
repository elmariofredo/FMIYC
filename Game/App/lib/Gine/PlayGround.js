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

  var PlayGround = Class.extend({
    init: function (options) {
      var my = this;

      // Default options
      this.options = {        
        id: uniq_id(),
        name: 'PlayGround',
        fps: 30,
        dimensions: {
          width: null,
          height: null
        },
        canvas: null,
        target_box: null
      }

      // Merge options
      $.extend( this.options, options || {} );

      // Create/Load Canvas
      this.load();
    },

    // Load/Create Canvas
    load: function () {
      var my = this;
      
      // Create Canvas if not exists
      if ( !my.options.canvas ) {
        my.canvas = document.createElement('canvas');
        my.canvas.width = my.options.dimensions.width || 0;
        my.canvas.height = my.options.dimensions.height || 0;
      
      // Use options Canvas
      } else {
        my.canvas = my.options.canvas;
      }

      // Ovewrite canvas id
      my.canvas.id = 'PlayGround';

      my.canvas_back = document.createElement('canvas');
      my.canvas_back.id = 'canvas_back';
      my.canvas_front = document.createElement('canvas');
      my.canvas_front.id = 'canvas_front';

      // Append to target_box
      if ( my.options.target_box ) {
        var target = my.options.target_box;

      // Append to Document
      } else {
        var target = document.body;
      }

      target.appendChild(my.canvas_back);
      target.appendChild(my.canvas);
      target.appendChild(my.canvas_front);

      // initializing the stage
      my.stage = new createjs.Stage(my.canvas);

      // Create Ticker
      createjs.Ticker.setFPS(30);
      createjs.Ticker.addListener(function(){my.tick()});
    },

    tick: function () {
      this.stage.update();
    }

  });

  window.PlayGround = PlayGround;
} (window));