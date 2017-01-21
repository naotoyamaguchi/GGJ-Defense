(Phaser => {
  const GAME_WIDTH = 600;
  const GAME_HEIGHT = 460;
  const ENEMY_SPAWN_FREQ = 150;
  const GAME_CONTAINER_ID = 'game';
  const GFX = 'gfx';
  let enemies;

  const preload = _ => {
    game.stage.backgroundColor = 'rgb(44, 196, 108)';
  };

  const create = _ => {
    enemies = game.add.group();

  };

  const update = _ => {

  };

  const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });


})(window.Phaser);