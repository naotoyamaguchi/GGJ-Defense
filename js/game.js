(Phaser => {
  const GAME_WIDTH = 1024;
  const GAME_HEIGHT = 768;
  const ENEMY_SPAWN_FREQ = 50;
  const ENEMY_SPEED = 5;
  const GAME_CONTAINER_ID = 'game';
  const GFX = 'gfx';
  let enemies;
  let towers;
  let canAddTower = true;
  let bulletsTowers, explosions, cursors, fireButton;


  const preload = _ => {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('grass', '../grass-bg.png');
    game.load.image('tower', 'assets/png/towerDefense_tile203.png');
    game.load.image('background', '../td_path.png');
    game.load.image('plane', 'assets/png/towerDefense_tile271.png');
  };

  const create = _ => {

    var tower = game.add.sprite(1,1, 'tower');
    tower.inputEnabled = true;

    tower.events.onInputDown.add(clicked, this);

    game.physics.enable(tower, Phaser.Physics.ARCADE);
    enemies = game.add.group();
    var grass = game.add.sprite(0.5, 0.5, 'grass');
    var bg = game.add.sprite(0, 0, 'background');
    game.world.bringToTop(enemies);
    game.world.bringToTop(tower);

  };

  const randomlySpawnEnemy = _ => {
    if( Math.floor(Math.random()*ENEMY_SPAWN_FREQ) === 0 ){
      let randomX = Math.floor( Math.random()*GAME_WIDTH );
      let enemy = enemies.add( game.add.image(20, 140, 'plane') );
      enemy.anchor.setTo(0.5, 0.5);
    }
  };

  const handleEnemyActions = _ => {
      enemies.children.forEach( enemy => {
        if(enemy.x <= 260 && enemy.y === 140){
          enemy.x += ENEMY_SPEED;
        }
        if(enemy.x === 260 && enemy.y <= 320){
          enemy.y += ENEMY_SPEED;
          enemy.angle = 90;
        }
        if(enemy.y === 320 && enemy.x <= 445){
          enemy.x += ENEMY_SPEED;
          enemy.angle = 0;
        }
        if(enemy.x === 445 && enemy.y >= 140){
          enemy.y -= ENEMY_SPEED;
          enemy.angle = -90;
        }
        if(enemy.y === 140 && enemy.x <= 896 && enemy.x >= 390){
          enemy.x += ENEMY_SPEED;
          enemy.angle = 0;
        }

    });
      //when enemy reaches x(500), console.log("holla")
      // enemies.children.forEach((testEnemy)=>{
      //   if(testEnemy.x === 400){
      //     console.log("holla");
      //   }
      // });

  };

  function clicked(e){
    console.log(game.input._x, game.input._y);
  }

  const update = _ => {
    randomlySpawnEnemy();
    handleEnemyActions();
  };




  const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });

})(window.Phaser);