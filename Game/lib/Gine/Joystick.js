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
    display: {
      segments: {
        h: [],
        v: []
      },
      current_segment: {
        h: null,
        v: null
      }
    },
    step_trigger_delay: 30,
    step_trigger_counter: 0,
    init: function (options) {
      var my = this;

      // Default options
      my.options = {
        id: uniq_id(),
        name: 'Joystick',
        playGround: playGround,
        trigger: function(){},
        controllers: []
      };

      // Merge options
      $.extend( my.options, options || {} );

      my.game = my.options.game;
      my.playGround = my.options.playGround;

      // Create/Load Canvas
      my.load();
    },

    /**
     * Create Display segments for controller
     * @param  {Hash} controller    Controller Options
     * @return {Boolean}            Always true my dear
     */
    defSegments: function (type, controller) {
      var my = this;

      var screen_size_type;

      if ( type == 'h' ) {
        screen_size_type = 'width';
      } else {
        screen_size_type = 'height';
      }

      var display_move_segment_size = my.game.dimensions[controller.segments.on].size[screen_size_type] / ( controller.segments[type].length + 1 );

      var Segments_borders = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };

      $.each( controller.segments[type], function ( index, segment ) {

        Segments_borders.bottom += display_move_segment_size;
        Segments_borders.right += display_move_segment_size;

        my.display.segments[type].push({
          borders: $.extend({}, Segments_borders),
          data: segment
        });

        Segments_borders.top += display_move_segment_size;
        Segments_borders.left += display_move_segment_size;

      });

    },

    detectSegment: function (type, controller) {
      var my = this;

      var axes, in_segment;

      if ( type == 'h' )
        axes = 'x';
      else
        axes = 'y';

      // Horizontal
      $.each( my.display.segments[type], function ( index, data ) {
        
        if ( type == 'h' )
          in_segment = ( my.game.playGround.stage.mouse[axes] < data.borders.right );
        else
          in_segment = ( my.game.playGround.stage.mouse[axes] < data.borders.bottom );


        if ( in_segment ) {
          my.display.current_segment[type] = my.display.segments[type][index];
          return false;
        } else {
          // TODO: cursor is not firing on very righ so then we can't afford default state
          // my.display.current_segment[type] = my.display.segments[type][controller.segments.default_segments[type]];
        }

      });

    },

    // Load event on playGround
    load: function () {
      var my = this;
      
      $.each( my.options.controllers, function ( name, controller ) {

        var bind_type = controller.bind.join(' ');

        if ( controller.segments !== undefined ) {
          my.defSegments('h', controller);
          my.defSegments('v', controller);
        }

        my.playGround.stage.setLoop(function () {
          
          if ( controller.segments !== undefined ) {
            my.detectSegment('h', controller);
            my.detectSegment('v', controller);
          }

          // Controller trigger
          if ( controller.trigger !== undefined )
            controller.trigger(my, event);

          // Option step trigger
          my.stepTrigger();
          my.playGround.stage.redraw();

        }).start();

      });
      
    },

    // Delay trigger to speed things up
    stepTrigger: function () {
      var my = this;

      // timeout
      my.step_trigger_counter += 1;

      if ( my.step_trigger_counter > my.step_trigger_delay ) {

        my.options.trigger(my);
        my.step_trigger_counter = 0;
        
      }

      

    }

  });

  window.Joystick = Joystick;
} (window));