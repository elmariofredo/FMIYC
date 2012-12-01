

var FMIYC = new Game({
  elements: GameElements,
  playGround: {
    color: '#000'
  },
  scenes: {
    game: [
      'view_background',
      'border_top',
      'border_bottom'
    ]
  },
  defaultScene: 'game',
  levels: Levels,
  warriorsWay: warriorsWay
});

FMIYC.build();

FMIYC.load();