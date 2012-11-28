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

  var Joystick = Class.extend({
    init: function (options) {
      var my = this;

      // Default options
      this.options = {        
        id: uniq_id(),
        name: 'Joystick',
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
      
      this.playGround.onMouseMove = function(mouseEvent) {
        my.move(mouseEvent);
      }
    },

    // Make Move Method
    move: function (mouseEvent) {

      // Call Instance move Method
      this.options.move({
        top: mouseEvent.stageY,
        left: mouseEvent.stageX
      });

      // Update Stage
      this.playGround.update();
    }

  });

  window.Joystick = Joystick;
} (window));