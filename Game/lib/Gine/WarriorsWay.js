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

      my.build_base_path();

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

        my.base_elements[type].shape = my.game.playGround.display.sprite( 
          oCanvas.extend( my.options[type].sprite, {
            y: my.options[type].position.top,
            x: left,
            frame: 1,
            direction: "x",
            generate: true,
            origin: {
              y: 'center',
              x: 'center'
            }
          })
        );        

      });

    },


    // Render All Elemets
    render: function () {
      var my = this;

      $.each( my.base_elements, function ( name, element) {
        my.game.elements[my.options.relative_to].addChild( element.shape );
      });

    },

    build_base_path: function () {
      var my = this;  

      var path;
      var from = 'start';
      var to = 'end';

      // my.options.path.offset = {
      //   top: ( my.options.path.style.thickness / 2 )
      // }

      // Define Basic Stroke
      // var stroke = new createjs.Graphics().beginStroke( my.options.path.style.color );

      // // TODO: Add more style options
      // // Set Style
      // stroke.setStrokeStyle( my.options.path.style.thickness );
  
      // stroke.moveTo( my.base_elements[from]['placement'].left, my.base_elements[from]['placement'].top + my.options.path.offset.top );
      
      // stroke.lineTo( my.base_elements[to]['placement'].left, my.base_elements[to]['placement'].top + my.options.path.offset.top );

      // path = new createjs.Shape( stroke.endStroke() );

      // my.base_elements['base_path'] = {
      //   shape: path
      // };

      // my.add_to_layer(0, path);  
    },

    move: function ( relative_position ) {
      var my = this;

      $.each( my.base_elements, function( name, element ) {
        // console.info(name, element, element.shape)
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