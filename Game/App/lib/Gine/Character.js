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
        src: 'Game/App/img/GenericCharacter.png',
        sprite: false
      }

      // Merge options
      $.extend( my.options, options || {} );

      my.id = my.options.id;
      my.name = my.options.name;
      my.unique_name = my.unique_name();
      my.playGround = my.options.playGround;
      my.warriorsWay = my.options.warriorsWay;

      // Create Image Element
      my.image = new Image();

      // Set on load Callback
      my.image.onload = function(){my.onLoadedImage()};

      // Create custom move method if defined
      if ( my.options.step )
        my.step = my.options.step;

      my.load();
    },

    // When Character Image is loaded
    onLoadedImage: function () {      

      if ( this.options.sprite ) {

        this.sprite  = new createjs.SpriteSheet(this.options.sprite);

        this.animation = new createjs.BitmapAnimation(this.sprite)

        this.animation.play();

        // Append Character to PlayGround
        this.playGround.addChild(this.animation)

      } else {

        // Create Bitmap Object
        this.bitmap = new createjs.Bitmap(this.image);
        this.bitmap.name = this.options.name;
        this.bitmap.snapToPixel = true;

      }


      // Append Character to PlayGround
      this.playGround.addChild(this.bitmap);

      // Set starting position
      this.start_position();


      // Update PlayGround
      this.playGround.update();
    },

    // Load Character Image
    load: function () {
      this.image.src = this.options.src;
    },

    // Go to start position
    start_position: function () {
      var my = this;

      my.move(my.warriorsWay.base_elements.start.placement)
    },

    run: function () {
      
    },

    set_coordinates: function (position) {
      var my = this;      

      // TODO: make it work also for non sprite images
      my.x = centerImage(position.left, my.options.sprite.frames.width);
      my.y = centerImage(position.top, my.options.sprite.frames.height);
    },

    move: function (position) {
      var my = this;
      
      my.set_coordinates(position);

      if ( my.animation !== undefined ) {

        my.animation.x = my.x;
        my.animation.y = my.y;

      } else {

        my.bitmap.x = my.x;
        my.bitmap.y = my.y;

      }

      my.playGround.update();
    }
  });


  window.Character = Character;
} (window));