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

  var Character = Class.extend({
    x: 0,
    y: 0,
    step: function () {},
    init: function (options) {
      var my = this;

      // Default options
      this.options = {        
        id: uniq_id(),
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
        src: './App/img/GenericCharacter.png',
        sprite: false
      }

      // Merge options
      $.extend( this.options, options || {} );

      this.playGround = this.options.playGround;

      // Create Image Element
      this.image = new Image();

      // Set on load Callback
      this.image.onload = function(){my.onLoadedImage()};

      // Create custom move method if defined
      if ( this.options.step )
        this.step = this.options.step;

      this.load();
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
      this.move(this.options.position);


      // Update PlayGround
      this.playGround.update();
    },

    // Load Character Image
    load: function () {
      this.image.src = this.options.src;
    },

    set_coordinates: function (postion) {
      // TODO: make it work also for non sprite images
      this.x = centerImage(postion.left, this.options.sprite.frames.width);
      this.y = centerImage(postion.top, this.options.sprite.frames.height);
    },

    move: function (position) {
      
      this.set_coordinates(position);

      if ( this.animation !== undefined ) {

        this.animation.x = this.x;
        this.animation.y = this.y;

      } else {

        this.bitmap.x = this.x;
        this.bitmap.y = this.y;

      }

      this.playGround.update();
    }
  });


  window.Character = Character;
} (window));