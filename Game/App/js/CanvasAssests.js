/**
 * Canvas Assets Object
 *
 * Depends on
 *   Base.js
 *   Class.js
 *   jQuery.js   
 * 
 */
(function (window, undefined) {

  var CanvasAssestsClass = Class.extend({
    init: function (options) {
      var my = this;

      // Default options
      this.options = {        
        id: uniq_id(),
        name: 'CanvasAssests',
      }

      // Merge options
      $.extend( this.options, options || {} );


      my.pureCanvasBack = document.getElementById("canvas_back").getContext("2d");
      my.pureCanvasFront = document.getElementById("canvas_front").getContext("2d");

    },


    elements: {

// > ENTER ASSETS HERE


      gradient: function (ctx) {

        var gradient;

        // gradient/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(1024.0, 400.0);
        ctx.lineTo(0.0, 400.0);
        ctx.lineTo(0.0, 0.0);
        ctx.lineTo(1024.0, 0.0);
        ctx.lineTo(1024.0, 400.0);
        ctx.closePath();
        gradient = ctx.createLinearGradient(512.0, 400.0, 512.0, 0.0);
        gradient.addColorStop(0.00, "rgb(85, 139, 155)");
        gradient.addColorStop(0.50, "rgb(87, 151, 145)");
        gradient.addColorStop(1.00, "rgb(88, 163, 135)");
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }














// > ENTER ASSETS HERE

    },

    place: function ( position, element, game) {

      if ( position == 'front' )
        var ctx = game.pureCanvasFront;
      else
        var ctx = game.pureCanvasBack;

      this.elements[element](ctx, game)
    }

  });

  window.CanvasAssestsClass = CanvasAssestsClass;
} (window));