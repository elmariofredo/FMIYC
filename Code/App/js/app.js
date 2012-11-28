
// Create Stage - Canvas
var playGround = (new PlayGround()).stage;

// Create Hero
var hero = new Character({name: 'Octocat', playGround: playGround});

// Add Controller for Hero
new Joystick({
  playGround: playGround,
  move: function(position) {
    hero.move(position);
  }
});

