(Phaser => {
  const GAME_WIDTH = 1000;
  const GAME_HEIGHT = 600;
  const ENEMY_SPAWN_FREQ = 150;
  const GAME_CONTAINER_ID = 'game';
  const GFX = 'gfx';
  let enemies;
  let towers;
  let canAddTower = true;
  let bulletsTowers, explosions, cursors, fireButton


  const preload = _ => {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = 'rgb(44, 196, 108)';
    game.load.image('tower', 'assets/png/towerDefense_tile203.png');
  };

  const create = _ => {
    enemies = game.add.group();

    var tower = game.add.sprite(0,0, 'tower');
    tower.inputEnabled = true;

    tower.events.onInputDown.add(clicked, this)

    game.physics.enable(tower, Phaser.Physics.ARCADE);

  };

  function clicked(e){
    console.log(game.input._x, game.input._y);
  }

  const update = _ => {

  };


  const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });

})(window.Phaser);