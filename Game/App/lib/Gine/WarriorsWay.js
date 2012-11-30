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
    init: function (options) {
      var my = this;

      // Default options
      this.options = {        
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
      $.extend( this.options, options || {} );

      this.playGround = this.options.playGround;

      // Create/Load Canvas
      this.load();
    },

    // Load event on playGround
    load: function () {
      var my = this;

      my.parse_sprites();

      my.build_base();

      my.build_base_path();
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
        my.base_elements[type]['sequence'] = new createjs.BitmapAnimation(my.base_elements[type]['sprite']);

        // Open first frame
        my.base_elements[type]['sequence'].gotoAndStop(1);

        // Set position
        my.base_elements[type]['sequence']['y'] = centerImage( my.options[type].position.top, my.options[type].sprite.frames.height );
        my.base_elements[type]['sequence']['x'] = centerImage( my.options[type].position.left, my.options[type].sprite.frames.width );

        // Create Placement coordinates using offset

        if ( my.options[type]['placement_offset'] !== undefined )
          my.base_elements[type]['placement'] = my.options[type]['placement_offset'];
        else
          my.base_elements[type]['placement'] = my.options.default_placement_offset;
        
        my.base_elements[type]['placement']['top'] += my.base_elements[type]['sequence']['y'];
        my.base_elements[type]['placement']['left'] += my.base_elements[type]['sequence']['x'];

        my.base_elements[type]['border'] = {
          left: my.options[type].position.left,
          right: my.options[type].position.left + my.options[type].sprite.frames.width
        }


        // Append Element to PlayGround
        my.playGround.addChild( my.base_elements[type]['sequence'] );

      });

      // Update PlayGround
      my.playGround.update();

    },

    get_scale_from_distance: function (object, start, end) {

      var distance = ( end.border.left - start.border.right ) * 1.1;

      return ( distance / object.spriteSheet['_frameWidth'] );
    },

    build_base_path: function () {
      var my = this;

      // Get line image
      var line = my.base_elements['line']['image'];

      line.scaleX = my.get_scale_from_distance( line, my.base_elements.start, my.base_elements.end );
      
      line.y = 96;
      line.x = my.base_elements.start.border.right-136

      my.playGround.addChild( line );

      my.playGround.update();      
    }

  });

  window.WarriorsWay = WarriorsWay;
} (window));