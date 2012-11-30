

// Create Stage - Canvas
var playGround = (new PlayGround({
  dimesions: {
    width: getWidth(),
    height: getPropotionalHeight(1024, 768)
  },
  target_box: document.getElementById('target_box')
})).stage;

// Create Game Path
var path = new WarriorsWay({
  start: {
    position:{
      top: 237,
      left: 400//140
    },
    placement_offset: {
      top: 30,
      left: 97
    },
    sprite: {
      images: ['./App/img/start.png'],
      frames: {width: 269, height: 117}
    }
  },
  end: {
    position:{
      top: 237,
      left: 800//1213
    },
    placement_offset: {
      top: 30,
      left: 175
    },
    sprite: {
      images: ['./App/img/end.png'],
      frames: {width: 269, height: 117}
    } 
  },
  joins: {
    sprite: {
      images: ['./App/img/path.png'],
      frames: {width: 166, height: 170}
    },
    kinds: {
      'line': {
        frame: 0,
        placement_offset: {
          top: 0,
          left: 0
        },
        guide: {
          // TODO
        }
      },
      'up': {
        frame: 1,
        placement_offset: {
          top: 0,
          left: 0
        }
      },
      'down': {
        frame: 2,
        placement_offset: {
          top: 0,
          left: 0
        }
      },
    }
  }
});

// Create Hero
var hero = new Character({
  name: 'Octocat',
  position: path.base_elements['start']['placement'],
  sprite: {
    images: ['./App/img/hero_100x100.png'],
    frames: {width: 100, height: 100},
    animations: {always:[0,30]}
  },
  step: function (track) {

    if ( this.animation !== undefined ) {

      if ( track.change.left > 0 )
        this.animation.x += 5;

    }

  }
});

// Create Hero
var clone = new Character({
  name: 'Clone',
  position: path.base_elements['end']['placement'], 
  sprite: {
    images: ['./App/img/clone_100x100.png'],
    frames: {width: 100, height: 100},
    animations: {always:[0,30]}
  }
});

// Add Controller for Hero
var joystick = new Joystick({
  move: function (track) {
    hero.step(track);
  }
});



