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
    position: {
      top: 0,
      left: 0
    },
    prev_position: {
      top: 0,
      left: 0
    },
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

      // For calibration purposes
      this.playGround.onMouseUp = function(mouseEvent) {
        // my.move(mouseEvent);
      }
      
    },

    // Make Move Method
    move: function (mouseEvent) {

      // Save Current position for comparsion
      this.position = {
        top: mouseEvent.stageY,
        left: mouseEvent.stageX
      }

      // Call Instance move Method
      this.options.move({
        change: {
          top: this.position.top - this.prev_position.top,
          left: this.position.left - this.prev_position.left
        },
        current: {
          top: this.position.top,
          left: this.position.left
        }
      });

      // Save Current position for comparsion
      this.prev_position = {
        top: mouseEvent.stageY,
        left: mouseEvent.stageX
      }

      // Update Stage
      this.playGround.update();
    }

  });

  window.Joystick = Joystick;
} (window));