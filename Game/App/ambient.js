

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
  path: {
    stroke: '58px rgba(180, 44, 58, 1)',
    placement_offset: {
      top: 29,
      left: 0
    }
  }
};


// /**
//  * Setup Enviroment
//  * @type {Object}
//  */
// var Game =  new Game({

//   elements: {

//     background: {
//       type: 'code',
//       path: [
//         {top: 0, left: 0},
//         {bottom: 0, right: 0}
//       ],
//       load: function (my) {

//         var shape = new createjs.Graphics();
//         shape.beginLinearGradientFill(
//           ["rgba(85, 139, 155, 1)", "rgba(87, 151, 145, 1)", "rgba(88, 163, 135, 1)"],
//           [0, .5, 1],
//           0,
//           0,
//           0,
//           my.dimensions.board.size.height-10
//         );
//         shape.drawRoundRect(
//           my.dimensions.board.corners.top_left.left,
//           my.dimensions.board.corners.top_left.top+5,
//           my.dimensions.board.size.width,
//           my.dimensions.board.size.height-10,
//           0
//         );

//         return new createjs.Shape(shape);

//       }
//     },

//     top_border: {
//       type: 'lineTo',
//       color: [181, 45, 23, 1],
//       style: {thickness: 9},
//       relative_to: 'board',
//       path: [
//         {top: 0, left: 0},
//         {top: 0, right: 0}
//       ]
//     },

//     bottom_border: {
//       type: 'lineTo',
//       color: [181, 45, 23, 1],
//       style: {thickness: 9},
//       path: [
//         {bottom: 0, left: 0},
//         {bottom: 0, right: 0}
//       ]
//     },






//     // background: {
//     //   type: 'code',
//     //   load: function (game) {
//     //     game.CanvasAssests.place('back', 'gradient', game)
//     //   }
//     // }
//   },



//   playGround: {
//     target_box: document.getElementById('target_box')
//   },


//   warriorsWay: {
//     relative_to: 'board',
//     start: {
//       position:{
//         top: 'middle',
//         left: 240
//       },
//       placement_offset: {
//         top: 30,
//         left: 97
//       },
//       sprite: {
//         images: ['Game/App/img/start.png'],
//         frames: {width: 269, height: 117}
//       }
//     },
//     end: {
//       position:{
//         top: 'middle',
//         left: 2000
//       },
//       placement_offset: {
//         top: 30,
//         left: 175
//       },
//       sprite: {
//         images: ['Game/App/img/end.png'],
//         frames: {width: 269, height: 117}
//       } 
//     },
//     path: {
//       style: {
//         color: 'rgba(180, 44, 58, 1)',
//         thickness: 58
//       },
//       offset: {
//         top: 0,
//         left: 0
//       }
//     },


//     joins: {
//       sprite: {
//         images: ['Game/App/img/path.png'],
//         frames: {width: 166, height: 170}
//       },
//       kinds: {
//         // 'line': {
//         //   frame: 0,
//         //   placement_offset: {
//         //     top: 0,
//         //     left: 0
//         //   },
//         //   guide: {
//         //     // TODO
//         //   }
//         // },
//         // 'up': {
//         //   frame: 1,
//         //   placement_offset: {
//         //     top: 0,
//         //     left: 0
//         //   }
//         // },
//         // 'down': {
//         //   frame: 2,
//         //   placement_offset: {
//         //     top: 0,
//         //     left: 0
//         //   }
//         // }
//       }
//     }
//   },


//   characters: [

//     // Octocat
//     {
//       name: 'Octocat',
//       type: 'hero',
//       sprite: {
//         images: ['Game/App/img/hero_100x100.png'],
//         frames: {width: 100, height: 100},
//         animations: {always:[0,30]}
//       },
//       step: function (track) {

//         this.warriorsWay.move({left: -5});

//         if ( this.animation !== undefined ) {

//           if ( track.change.left > 0 )
//             this.animation.x += 5;

//         }

//       }
//     },

//     // // Evil Clon
//     // {
//     //   name: 'Clone',
//     //   // position: path.base_elements['end']['placement'], 
//     //   sprite: {
//     //     images: ['Game/App/img/clone_100x100.png'],
//     //     frames: {width: 100, height: 100},
//     //     animations: {always:[0,30]}
//     //   }
//     // }

//   ],


// });