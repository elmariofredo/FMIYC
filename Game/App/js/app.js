

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
var joystick = new Joystick({
  move: function(position) {
    // console.info(position)
    hero.move(position);
  }
});


// Create Game Path
var path = new WarriorsWay({
  start: {
    top: 237,
    left: 126,
    sprite: {
      images: ['./App/img/start.png'],
      frames: {width: 269, height: 117}
    }
  },
  end: {
    top: 237,
    left: 1293,
    sprite: {
      images: ['./App/img/end.png'],
      frames: {width: 269, height: 117}
    } 
  }
})



