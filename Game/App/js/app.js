

// Create Stage - Canvas
var playGround = (new PlayGround({
  width: getWidth(),
  height: getPropotionalHegiht(1024, 768),
  target_box: document.getElementById('target_box')
})).stage;

// Create Hero
var hero = new Character({
  name: 'Octocat',
  sprite: {
    images: ['./App/img/hero_100x100.png'],
    frames: {width: 100, height: 100},
    animations: {always:[0,30]}
  },
  offset: {
    top: -50,
    left: -50
  }
});

// Create Hero
var clone = new Character({
  name: 'Clone',
  sprite: {
    images: ['./App/img/clone_100x100.png'],
    frames: {width: 100, height: 100},
    animations: {always:[0,30]}
  },
  offset: {
    top: -50,
    left: -50
  }
});

// Add Controller for Hero
new Joystick({
  move: function(position) {
    hero.move(position);
  }
});

