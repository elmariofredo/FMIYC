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

  var Game = GameClass.extend({

    dimensions: {
      display: {
        size: {
          width: $(window).width(),
          height: $(window).height()
        },
        offset: {
          top: 0,
          left: 0
        }
      },
      board: {
        size: {
          width: null,
          height: null
        },
        offset: {
          top: 0,
          left: 0
        },
        corners: {
          top_left: {},
          top_right: {},
          bottom_left: {},
          bottom_right: {}
        }
      }
    },

    playGround: null,
    warriorsWay: null,
    characters: {},
    characters_map: {
      hero: [],
      enemie: []
    },
    controllers: [],
    elements: {},
    all_elements: {},
    scenes: {},
    levels: [],
    current_level: null,

    init: function (options) {
      var my = this;

      // Default options
      this.options = {        
        id: uniq_id(),
        name: 'Game',
        resolution: {
          width: 1024,
          height: 400
        },
        default_view: 'board',
        playGround: {},
        elements: {},
        scenes: [],
        default_level: 0
      };

      // Merge options
      $.extend( this.options, options || {} );

      my.setLevels();

      my.setDimensions();
    },


    setLevels: function () {
      var my = this;

      my.levels = my.options.levels;

      my.current_level = my.levels[my.options.default_level];

    },


    // Set Game Sizes, Resolutions, and offsets
    setDimensions: function () {
      var my = this;

      // Set Board size based on defined resolution
      my.dimensions.board.size = {
        width: my.dimensions.display.size.width,
        height: (
          my.options.resolution.height * ( my.dimensions.display.size.width / my.options.resolution.width )
        )
      };

      // Set Board offset based on centerd position
      my.dimensions.board.offset.top = (
        ( my.dimensions.display.size.height - my.dimensions.board.size.height ) / 2
      );

      my.dimensions.board.corners = my.getElementCornerPosition('board');
    },

    /**
     * Define Element Corner Positions
     * @param  {String} element Element Name
     * @return {Hash}           Coordinates for each corner
     */
    getElementCornerPosition: function ( element ) {
      var my = this;

      return {
        top_left: my.getRelativePosition(element, {top: 0, left: 0}),
        top_right: my.getRelativePosition(element, {top: 0, right: 0}),
        bottom_left: my.getRelativePosition(element, {bottom: 0, left: 0}),
        bottom_right: my.getRelativePosition(element, {bottom: 0, right: 0})
      };

    },
    
    /**
     *  !DEPRECATED SOLVED BY OCANVAS! Apply offset to the position for specified element
     * @param  {String} element  Element where to correlate position to
     * @param  {Hash}   position Hash with top and left coordinates
     * @return {Hash}   position Hash with correlated top and left coordinates
     */
    getRelativePosition: function (element, position) {
      var my = this;
      if ( element === undefined || !element || my.dimensions[element] === undefined ) { element = my.options.default_view; }

      if ( position.top == 'middle' ) {

        position.top = ( ( my.dimensions[element] || my.dimensions.display ).size.height / 2 );

      } else {

        // Add Bottom Coordinates Support
        if ( position.bottom !== undefined )
          position.top = ( my.dimensions[element].size.height - position.bottom );
 
        position.top += my.dimensions[element].offset.top;

      }



      // Add Right Coordinates Support
      if ( position.right !== undefined )
        position.left = ( my.dimensions[element].size.width - position.right );

      position.left += my.dimensions[element].offset.left;

      // For simplicity we return both top/left and y/x values
      $.extend( position, {
        y: position.top,
        x: position.left
      });

      return position;
    },


    // Render whole game
    // TODO: let's use ocanvas modules instead
    build: function () {
      var my = this;

      my.buildPlayGround();  

      my.buildElements();

      my.buildScenes();

      my.buildWarriorsWay();

      my.buildCharacters();

      my.attachControllers();

      my.warriorsWay.setupCheckpoints();
    },

    load: function () {
      this.playGround.canvas.scenes.load(this.options.defaultScene);
    },

    // Create Stage - Canvas
    buildPlayGround: function () {
      var my = this;

      // TODO: make this by option
      // Set playground to full screen
      my.options.playGround.dimensions = my.dimensions.display.size;

      // Add game reference
      my.options.playGround.game = my;

      my.playGround = new PlayGround( my.options.playGround );

      window.playGround = my.playGround;
    },

    buildScenes: function ( ) {
      var my = this;

      $.each( my.options.scenes, function ( name, elements ) {

        my.scenes[name] = my.playGround.canvas.scenes.create( name, function () {
          var scene = this;

          $.each( elements, function ( index, element ) {
            scene.add(my.elements[element]);
          });
          
        });

      });

    },

    // Build static game elements
    buildElements: function () {
      var my = this;

      $.each( my.options.elements, function ( index, element_options ) {

        var relative_to = ( element_options.relative_to || my.options.default_view );

        var relative_positions = $.map( element_options.positions, function ( position ) {
          return my.getRelativePosition( relative_to, position );
        });

        if ( element_options.width !== undefined && element_options.width == 'full' )
          element_options.width = my.dimensions[relative_to].size.width;

        if ( element_options.height !== undefined && element_options.height == 'full' )
          element_options.height = my.dimensions[relative_to].size.height;

        switch ( element_options.type ) {

          case 'line':

            my.elements[index] = my.playGround.display.line({
              start: relative_positions[0],
              end: relative_positions[1],
              stroke: element_options.stroke
            });

            break;

          case 'rectangle':

            my.elements[index] = my.playGround.display.rectangle({
              x: relative_positions[0].left,
              y: relative_positions[0].top,
              width: element_options.width,
              height: element_options.height,
              fill: element_options.fill
            }); 

            break;

          case 'code':

            my.elements[index] = element_options.load(my);

            break;
        }

        my.dimensions[index] = {};

        my.dimensions[index].size = {
          width: my.elements[index].width,
          height: my.elements[index].height
        };

        my.dimensions[index].offset = {
          top: relative_positions[0].top,
          left: relative_positions[0].left
        };

      });

    },

    // Create Game Path
    buildWarriorsWay: function () {

      this.options.warriorsWay.game = this;      
      this.warriorsWay = new WarriorsWay( this.options.warriorsWay );

    },

    // Create Hero
    buildCharacters: function () {
      var my = this;

      $.each( this.options.characters, function (index, character_options) {

        character_options.warriorsWay = my.warriorsWay;
        character_options.game = my;

        var character = new Character(character_options);

        my.characters[character.name] = character;

        my.characters_map[character_options.type].push(character.unique_name);
      });

    },

    attachControllers: function () {
      var my = this;

      my.options.joystick.game = my;

      if ( my.warriorsWay.trigger !== undefined )
        my.options.joystick.trigger = my.warriorsWay.trigger;

      my.joystick = new Joystick(my.options.joystick);
    },

    /**
     * Detect Collisions
     * @param  {Hash} border1 Coordinates and size
     * @param  {Hash} border2 Coordinates and size
     * @return {Boolean}      If colision is detected return true
     */
    collisionObjects: function (objectA, objectB) {
      var my = this;
      return my.rect_collision(objectA.x, objectA.y, objectA.height, objectB.x, objectB.y, objectB.height/5)
    },  

    // TODO: Create better colision detection
    rect_collision: function(x1, y1, size1, x2, y2, size2) {
      var bottom1, bottom2, left1, left2, right1, right2, top1, top2;
      left1 = x1 - size1;
      right1 = x1 + size1;
      top1 = y1 - size1;
      bottom1 = y1 + size1;
      left2 = x2 - size2;
      right2 = x2 + size2;
      top2 = y2 - size2;
      bottom2 = y2 + size2;
      return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
    }


  });

  window.Game = Game;
} (window));