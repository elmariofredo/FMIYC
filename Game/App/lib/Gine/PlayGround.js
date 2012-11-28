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
        width: null,
        height: null,
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
      if ( !this.options.canvas ) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.width || getWidth();
        this.canvas.height = this.options.height || getHeight();
      
      // Use options Canvas
      } else {
        this.canvas = this.options.canvas;
      }

      // Ovewrite canvas id
      this.canvas.id = 'PlayGround';

      // Append to target_box
      if ( this.options.target_box ) {
        this.options.target_box.appendChild(this.canvas);

      // Append to Document
      } else {
        document.body.appendChild(this.canvas);
      }      

      // initializing the stage
      this.stage = new createjs.Stage(this.canvas);

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