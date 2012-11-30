
/**
 * Setup Enviroment
 * @type {Game}
 */
var Game =  new Game({

  images: {
    background: {
      src: './App/img/gradient.png'
    }
  },

  elements: {

    top_border: {
      type: 'lineTo',
      color: [181, 45, 23, 1],
      style: {thickness: 9},
      relative_to: 'board',
      path: [
        {top: 0, left: 0},
        {top: 0, right: 0}
      ]
    },

    bottom_border: {
      type: 'lineTo',
      color: [181, 45, 23, 1],
      style: {thickness: 9},
      path: [
        {bottom: 0, left: 0},
        {bottom: 0, right: 0}
      ]
    },

    background: {
      type: 'code',
      load: function (game) {
        game.CanvasAssests.place('back', 'gradient', game)        
      }
    }
  },



  playGround: {
    // dimesions: {
    //   width: getWidth(),
    //   height: getPropotionalHeight(1024, 768)
    // },
    target_box: document.getElementById('target_box')
  },


  warriorsWay: {
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
  },


  characters: [

    // Octocat
    {
      name: 'Octocat',
      // position: path.base_elements['start']['placement'],
      sprite: {
        images: ['./App/img/hero_100x100.png'],
        frames: {width: 100, height: 100},
        animations: {always:[0,30]}
      },
      step: function (track) {

        console.info(track, getWidth())

        if ( this.animation !== undefined ) {

          if ( track.change.left > 0 )
            this.animation.x += 5;

        }

      }
    },

    // Evil Clon
    {
      name: 'Clone',
      // position: path.base_elements['end']['placement'], 
      sprite: {
        images: ['./App/img/clone_100x100.png'],
        frames: {width: 100, height: 100},
        animations: {always:[0,30]}
      }
    }

  ],


  controllers: [

    {
      move: function (track) {
        // hero.step(track);
      }
    }

  ]


});