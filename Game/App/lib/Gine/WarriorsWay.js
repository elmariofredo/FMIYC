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
      }

      // Merge options
      $.extend( my.options, options || {} );

      my.playGround = my.options.playGround;



      // Create/Load Canvas
      my.load();
    },

    // Load event on playGround
    load: function () {
      var my = this;

      my.parse_sprites();

      my.build_base();

      my.build_base_path();

      my.render();
    },

    parse_sprites: function () {
      var my = this;

      my.joins_sprite = new createjs.SpriteSheet( my.options.joins.sprite );

      $.extend( my.base_elements, my.options.joins.kinds )

      $.each( my.options.joins.kinds, function ( name, options ){

        my.base_elements[name]['image'] = new createjs.BitmapAnimation(my.joins_sprite).clone();
        my.base_elements[name]['image']['y'] = 0;
        my.base_elements[name]['image']['x'] = 0;

        my.base_elements[name]['image'].gotoAndStop( options.frame );

      });      

    },

    // Build Start & End
    build_base: function () {
      var my = this;

      $.each( ['start', 'end'], function ( index, type ) {

        // Set Relative Postion to selected element
        my.options[type].position = my.options.game.getRelativePosition(my.options.relative_to, my.options[type].position); 

        my.base_elements[type] = {}
        my.base_elements[type]['options'] = my.options[type];
        my.base_elements[type]['sprite'] = new createjs.SpriteSheet(my.options[type].sprite);
        my.base_elements[type]['shape'] = new createjs.BitmapAnimation(my.base_elements[type]['sprite']);

        // Open first frame
        my.base_elements[type]['shape'].gotoAndStop(1);

        // Set position
        my.base_elements[type]['shape']['y'] = centerImage( my.options[type].position.top, my.options[type].sprite.frames.height );
        my.base_elements[type]['shape']['x'] = centerImage( my.options[type].position.left, my.options[type].sprite.frames.width );

        // Create Placement coordinates using offset

        if ( my.options[type]['placement_offset'] !== undefined )
          my.base_elements[type]['placement'] = my.options[type]['placement_offset'];
        else
          my.base_elements[type]['placement'] = my.options.default_placement_offset;
        
        my.base_elements[type]['placement']['top'] += my.base_elements[type]['shape']['y'];
        my.base_elements[type]['placement']['left'] += my.base_elements[type]['shape']['x'];

        my.base_elements[type]['border'] = {
          left: my.options[type].position.left,
          right: my.options[type].position.left + my.options[type].sprite.frames.width
        }


        // Append Element to PlayGround
        my.add_to_layer(1, my.base_elements[type]['shape']);
        

      });

    },

    /**
     * Add Element to specific layer
     * @param {Integer} layer   Layer number
     * @param {Object} element  Element
     */
    add_to_layer: function ( layer, element ) {
      var my = this;

      if ( my.layers[layer] === undefined )
        my.layers[layer] = [];

      my.layers[layer].push(element)
    },

    // Render All Elemets
    render: function () {
      var my = this;

      $.each(my.layers, function ( index, layer) {
        $.each(layer, function ( index, element) {
          my.playGround.addChild( element );
        });
      });

      my.playGround.update();
    },

    get_scale_from_distance: function (object, start, end) {

      var distance = ( end.border.left - start.border.right ) * 1.1;

      return ( distance / object.spriteSheet['_frameWidth'] );
    },

    build_base_path: function () {
      var my = this;  

      var path;
      var from = 'start';
      var to = 'end';

      my.options.path.offset = {
        top: ( my.options.path.style.thickness / 2 )
      }

      // Define Basic Stroke
      var stroke = new createjs.Graphics().beginStroke( my.options.path.style.color );

      // TODO: Add more style options
      // Set Style
      stroke.setStrokeStyle( my.options.path.style.thickness );
  
      stroke.moveTo( my.base_elements[from]['placement'].left, my.base_elements[from]['placement'].top + my.options.path.offset.top );
      
      stroke.lineTo( my.base_elements[to]['placement'].left, my.base_elements[to]['placement'].top + my.options.path.offset.top );

      path = new createjs.Shape( stroke.endStroke() );

      my.base_elements['base_path'] = {
        shape: path
      };

      my.add_to_layer(0, path);  
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