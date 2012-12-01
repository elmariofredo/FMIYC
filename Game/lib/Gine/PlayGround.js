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
        my.canvas_element = document.createElement('canvas');
        my.canvas_element.width = my.options.dimensions.width || 0;
        my.canvas_element.height = my.options.dimensions.height || 0;
      
      // Use options Canvas
      } else {
        my.canvas_element = my.options.canvas;
      }

      // Ovewrite canvas id
      my.canvas_element.id = 'PlayGround';

      // Append to target_box
      if ( my.options.target_box ) {
        var target = my.options.target_box;

      // Append to Document
      } else {
        var target = document.body;
      }

      target.appendChild(my.canvas_element);

      // initializing the stage
      my.stage = oCanvas.create({
        canvas: my.canvas_element,
        background: my.options.color || '#ff00ff',
        fps: my.options.fps,
        disableScrolling: true
      });

      // Aliases
      my.canvas = my.stage;
      my.display = my.stage.display;

    },

  });

  window.PlayGround = PlayGround;
} (window));