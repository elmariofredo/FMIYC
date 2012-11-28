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
        src: './App/img/GenericCharacter.png'
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
      
      // Create Bitmap Object
      this.bitmap = new createjs.Bitmap(this.image);
      this.bitmap.name = this.options.name;
      this.bitmap.snapToPixel = true;

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
      this.x = postion.left;
      this.y = postion.top;
    },

    move: function (position) {
      this.set_coordinates(position);

      this.bitmap.x = this.x;
      this.bitmap.y = this.y;

      this.playGround.update();
    }
  });


  // function Character(options) {
  //     this.options = options;
  //     this.initialize();
  // }

  // Character.prototype = new createjs.Bitmap();

  // Character.prototype.Bitmap_initialize = Character.prototype.initialize;
 
  // Character.prototype.initialize = function () {

  //   console.info(this.options)

  //     // this.Bitmap_initialize(image);
  //     // this.name = 'Character';
  //     // this.snapToPixel = true;
  // };

  // Character.prototype.go = function() {

  // };

  window.Character = Character;
} (window));