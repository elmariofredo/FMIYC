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
    controllers: [],
    elements: {},

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
        default_view: 'board'
      }

      // Merge options
      $.extend( this.options, options || {} );

      this.playGround = this.options.playGround;

      my.setDimensions();

      // Create/Load Canvas
      this.load();
    },

    // Load event on playGround
    load: function () {
      var my = this;
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

      my.dimensions.board.corners = my.getElementCornerPosition('board')
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
      }

    },
    
    /**
     *  Apply offset to the position for specified element
     * @param  {String} element  Element where to correlate position to
     * @param  {Hash}   position Hash with top and left coordinates
     * @return {Hash}   position Hash with correlated top and left coordinates
     */
    getRelativePosition: function (element, position) {
      var my = this;
      if ( element === undefined || !element ) { element = my.options.default_view }

      // Add Bottom Coordinates Support
      if ( position['bottom'] !== undefined )
        position.top = ( my.dimensions[element].size.height - position.bottom );

      
      position.top += my.dimensions[element].offset.top;

      // Add Right Coordinates Support
      if ( position['right'] !== undefined )
        position.left = ( my.dimensions[element].size.width - position.right );

      position.left += my.dimensions[element].offset.left;

      return position;
    },

    /**
     * Use getRelativePosition for top position
     * @param  {String} element         Element where to correlate position to
     * @param  {Integer} top_position  top position
     * @return {Integer}                Return top Position
     */
    getRelTop: function (element, top_position) {
      return this.getRelativePosition(element, {top: top_position}).top;
    },

    /**
     * Use getRelativePosition for left position
     * @param  {String} element         Element where to correlate position to
     * @param  {Integer} left_position  Left position
     * @return {Integer}                Return Left Position
     */
    getRelLeft: function (element, left_position) {
      return this.getRelativePosition(element, {left: left_position}).left;
    },



    // Render whole game
    render: function () {
      var my = this;

      my.buildPlayground();



      my.buildElements();

      my.buildWarriorsWay();

      // my.buildCharacters();

      my.attachControllers();

    },

    // Create Stage - Canvas
    buildPlayground: function () {
      var my = this;

      // TODO: make this by option
      // Set playground to full screen
      my.options.playGround.dimensions = my.dimensions.display.size;

      my.playGroundStage = new PlayGround( my.options.playGround );
      my.playGround = my.playGroundStage.stage;

      my.pureCanvasBackElement = document.getElementById("canvas_back")
      my.pureCanvasBack = my.pureCanvasBackElement.getContext("2d");
      my.pureCanvasFrontElement = document.getElementById("canvas_front")
      my.pureCanvasFront = my.pureCanvasFrontElement.getContext("2d");

      my.pureCanvasBackElement.height = my.dimensions.display.size.height

      my.CanvasAssests = new CanvasAssestsClass();

      window.playGround = my.playGround;
    },

    // Build static game elements
    buildElements: function () {
      var my = this;

      $.each( my.options.elements, function ( index, element_options ) {

        var shape = null;

        switch ( element_options.type ) {
          case 'lineTo':

            // Define Basic Stroke
            var stroke = new createjs.Graphics().beginStroke( my.getColor( element_options.color ) );

            // TODO: Add more style options
            // Set Style
            stroke.setStrokeStyle( element_options.style.thickness );

            // Get Start Position
            var current_path = element_options.path.shift();

            // Start Position
            var position = my.getRelativePosition(element_options.relative_to, current_path);
            // console.info(position)
            stroke.moveTo( position.left, position.top );

            // Go to each path
            $.each( element_options.path, function ( index, element_options_path ) {
              
              var position = my.getRelativePosition(element_options.relative_to, element_options_path);
              stroke.lineTo( position.left, position.top );

            });

            shape = new createjs.Shape( stroke.endStroke() );

            break;

          case 'code':

            shape = element_options.load(my);

            break;
        }

        if ( shape ) {
          my.playGround.addChild(shape);
          my.playGround.update();
        }
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

        var character = new Character(character_options);

        my.characters[character.unique_name] = character;

      });

    },

    attachControllers: function () {
      var my = this;

      $.each( this.options.controllers, function (index, controller) {

        my.controllers.push(new Joystick(controller));

      });

    }


  });

  window.Game = Game;
} (window));