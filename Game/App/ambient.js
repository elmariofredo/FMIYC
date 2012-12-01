/**
 * 
 * Setup Enviroment
 * 
 */

var GameElements = {

  view_background: {
    type: 'rectangle',
    positions: [
      {top: 0, left: 0}
    ],
    width: 'full',
    height: 'full',
    fill: 'linear-gradient(to bottom, rgba(89,165,135,1) 0%,rgba(82,155,158,1) 50%,rgba(86,139,155,1) 100%)'
  },

  border_top: {
    type: 'line',
    positions: [
      {top: 0, left: 0},
      {top: 0, right: 0}
    ],
    stroke: "9px #c1272d"
  },

  border_bottom: {
    type: 'line',
    positions: [
      {bottom: 0, left: 0},
      {bottom: 0, right: 0}
    ],
    stroke: "9px #c1272d"
  }

};

var Levels = [
  {
    length: 700,
    stack: 1
  }
];


var warriorsWay = {
  relative_to: 'view_background',
  start: {
    name: 'start_stand',
    position: {
      top: 'middle',
      left: 170
    },
    placement_offset: {
      top: 0,
      left: 15
    },
    sprite: {
      image: 'Game/img/start.png',
      generate: true,
      width: 269,
      height: 117
    }
  },
  end: {
    name: 'end_stand',
    position: {
      top: 'middle',
      left: 0
    },
    placement_offset: {
      top: 0,
      left: -15
    },
    sprite: {
      image: 'Game/img/end.png',
      generate: true,
      width: 269,
      height: 117
    } 
  },
  finish: {
    name: 'finish',
    position: {
      top: 'middle',
      left: 0
    }
  },
  path: {
    stroke: '60px rgba(180, 44, 58, 1)',
    placement_offset: {
      top: 29,
      left: 0
    }
  },
  checkpoints: [
    {
      name: 'hero_finish',
      object_names: ['Octocat', 'finish'],
      callback: function ( warriorWay, data ) {
        warriorWay.freeze();        
      }
    }
  ]
};

var Characters = [

  // Octocat
  {
    name: 'Octocat',
    type: 'hero',
    relative_to: 'view_background',
    sprite: {
      image: 'Game/img/hero_100x100.png',
      generate: true,
      width: 100,
      height: 100,
      origin: {
        y: 80,
        x: 103
      }
    },
    step: function (track) {

      this.warriorsWay.move({left: -5});

      if ( this.animation !== undefined ) {

        if ( track.change.left > 0 )
          this.animation.x += 5;

      }

    }
  }
];

var JoystickOptions = {  
  controllers: {
    cursorMove: {
      bind: ['mousemove', 'touchmove'],
      to: 'view_background',
      segments: {
        on: 'display',
        default_segments: {
          h: 0,
          v: 1
        },
        h: [
          {
            speed: 0
          },
          {
            speed: 7
          },
          {
            speed: 10
          },
          {
            speed: 20
          }
        ],
        v: [
          {
            go: 'top'
          },
          {
            go: 'top'
          },
          {
            go: 'straight'
          },
          {
            go: 'bottom'
          },
          {
            go: 'bottom'
          }
        ]
      },
      trigger: function(joystick, event) {
       
        joystick.game.warriorsWay.roll({
          top: 0,
          left: ( joystick.display.current_segment.h.data.speed * -1 )
        });
      }
    }
  }
};


