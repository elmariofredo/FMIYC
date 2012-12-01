/**
 * Character Object
 *
 * Depends on
 *   Base.js
 *   Class.js
 *   jQuery.js
 *   Bitmap.js
 *
 */

(function (window, undefined) {

  var Character = GameClass.extend({
    x: 0,
    y: 0,
    step: function () {},
    init: function (options) {
      var my = this;

      // Default options
      this.options = {
        id: my.unique_id(),
        playGround: playGround,
        name: 'GenericCharacter',
        move: false,
        speed: 30,
        armor: 0,
        position: {
          x: 0,
          y: 0
        },
        offset: {
          top: 0,
          left: 0
        },
        sprite: false
      };

      // Merge options
      $.extend( my.options, options || {} );

      my.id = my.options.id;
      my.name = my.options.name;
      my.unique_name = my.unique_name();

      my.game = my.options.game;
      my.playGround = my.options.playGround;
      my.warriorsWay = my.options.warriorsWay;

      // Create custom move method if defined
      if ( my.options.step )
        my.step = my.options.step;

      my.load();
    },

    // Load Character Image
    load: function () {
      var my = this;

      // Extend Default Options
      oCanvas.extend( my.options.sprite, {
        direction: "x",
        duration: 35,
        generate: true,
        y: 50,
        x: 50,
        origin: {
          y: 80,
          x: 103
        },
        numFrames: 30
      });

      my.character = my.game.playGround.display.sprite( my.options.sprite );

      my.character.start();

      // Set starting position
      my.start_position();

      my.render();
    },

    // Go to start position
    start_position: function () {
      var my = this;

      my.move(my.warriorsWay.base_elements.start.placement);
    },

    // Render Character
    render: function () {
      var my = this;

      my.game.elements[my.options.relative_to].addChild( my.character );

    },

    run: function () {
      
    },

    move: function (position) {
      var my = this;

      my.character.y = my.y = position.top;
      my.character.x = my.x = position.left;

    }

  });


  window.Character = Character;
} (window));