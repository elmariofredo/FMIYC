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
    init: function (options) {
      var my = this;

      // Default options
      this.options = {        
        id: uniq_id(),
        playGround: playGround,
        name: 'GenericCharacter',
        speed: 30,
        armor: 0,
        start: {
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

      // Update PlayGround
      this.playGround.update();
    },

    // Load Character Image
    load: function () {
      this.image.src = this.options.src;
    },

    set_coordinates: function (postion) {
      this.x = postion.left+this.options.offset.left;
      this.y = postion.top+this.options.offset.top;
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