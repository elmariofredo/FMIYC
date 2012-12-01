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

  var WarriorsWay = GameClass.extend({
    base_elements: {},
    joins_sprite: [],
    layers: [],
    elements: {},
    init: function (options) {
      var my = this;

      // Default options
      my.options = {        
        id: uniq_id(),
        name: 'WarriorsWay',
        playGround: playGround,
        default_placement_offset: {
          top: 0,
          left: 0
        },
        move: function () {}
      };

      // Merge options
      $.extend( my.options, options || {} );

      my.playGround = my.options.playGround;

      my.game = my.options.game;

      // Create/Load Canvas
      my.load();
    },

    // Load event on playGround
    load: function () {
      var my = this;


      my.build_base();

      my.build_path('path', 'start', 'end');

      my.render();
    },


    // Build Start & End
    build_base: function () {
      var my = this;

      $.each( ['start', 'end'], function ( index, type ) {

        // Set Relative Postion to selected element
        my.options[type].position = my.options.game.getRelativePosition(my.options.relative_to, my.options[type].position); 

        my.base_elements[type] = {};
        my.base_elements[type].options = my.options[type];

        var left = my.options[type].position.left;

        if ( type == 'end' )
          left = ( my.options.start.position.left + my.game.current_level.length );

        // Extend Default Options
        oCanvas.extend( my.options[type].sprite, {
          y: my.options[type].position.top,
          x: left,
          frame: 2,
          direction: "x",
          generate: true,
          origin: {
            y: 'center',
            x: 'center'
          }
        });

        my.base_elements[type].shape = my.game.playGround.display.sprite( my.options[type].sprite );
        my.base_elements[type].placement = {
          // top: 0,
          top: ( my.options[type].position.top + my.options[type].placement_offset.top ),
          // left: 0
          left: ( left + my.options[type].placement_offset.left )
        };

      });

    },


    // Render All Elemets
    render: function () {
      var my = this;

      $.each( my.base_elements, function ( name, element ) {
        my.game.elements[my.options.relative_to].addChild( element.shape );
      });

    },

    build_path: function ( type, from, to ) {
      var my = this;  

      my.base_elements[type] = {};

      my.base_elements[type].shape = my.playGround.display.line({
        start: my.addXY(my.base_elements[from].placement),
        end: my.addXY(my.base_elements[to].placement),
        stroke: my.options.path.stroke
      });

      my.base_elements[type].placement = {
        top: ( my.options.path.placement_offset.top ),
        left: 0
      };
 
    },

    roll: function ( relative_position ) {
      var my = this;

      $.each( my.base_elements, function( name, element ) {
        my.move_element( element.shape, relative_position );
      });

    },

    move_element: function ( element, relative_position ) {

      element.y += relative_position.top || 0;
      element.x += relative_position.left || 0;

    }

  });

  window.WarriorsWay = WarriorsWay;
} (window));