// jshint esversion: 6

(Phaser => {
  const GAME_WIDTH = 1024;
  const GAME_HEIGHT = 768;
  const ENEMY_SPAWN_FREQ = 50;
  const ENEMY_SPEED = 5;
  const ENEMY_BULLET_ACCEL = 75;
  const ENEMY_FIRE_FREQ = 100;
  const GAME_CONTAINER_ID = 'game';
  const GFX = 'gfx';
  let enemies;
  let towerBullets;
  let towers;
  let canAddTower = true;
  let bulletsTowers, explosions, cursors, fireButton;


  const preload = _ => {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('grass', '../grass-bg.png');
    game.load.image('tower', 'assets/png/towerDefense_tile203.png');
    game.load.image('background', '../td_path.png');
    game.load.image('plane', 'assets/png/towerDefense_tile271.png');
    game.load.image('bullet', 'assets/png/towerDefense_tile298.png');

  };

  const create = _ => {

    towerBullets = game.add.group();
    towerBullets.enableBody = true;

    var tower = game.add.sprite(1,1, 'tower');
    towers = game.add.group();

    var bullet = game.add.sprite(1,1, 'bullet');

    // tower.events.onInputDown.add(clicked, this);

    game.physics.enable(tower, Phaser.Physics.ARCADE);
    game.physics.enable(bullet, Phaser.Physics.ARCADE);
    game.physics.enable(towerBullets, Phaser.Physics.ARCADE);
    enemies = game.add.group();

    var grass = game.add.sprite(0.5, 0.5, 'grass');
    grass.inputEnabled = true;
    grass.events.onInputDown.add(clicked);

    var bg = game.add.sprite(0, 0, 'background');
    game.world.bringToTop(enemies);
    game.world.bringToTop(towers);
    game.world.bringToTop(towerBullets);
  };

  const randomlySpawnEnemy = _ => {
    if( Math.floor(Math.random()*ENEMY_SPAWN_FREQ) === 0 ){
      let randomX = Math.floor( Math.random()*GAME_WIDTH );
      let enemy = enemies.add( game.add.image(20, 140, 'plane') );
      enemy.anchor.setTo(0.5, 0.5);
    }
  };


  const randomTowerFire = tower => {
    if( Math.floor(Math.random()*ENEMY_FIRE_FREQ) === 0 ){
      let towerBullet = towerBullets.add(game.add.sprite(tower.x, tower.y, 'bullet'));
      towerBullet.anchor.setTo(0.5, 0.5);





      // tower.
      // towerBullet.checkWorldBounds = true;
      // towerBullet.outOfBoundsKill = true;
      towerBullets.add( towerBullet );
    }
  };


  const handleBulletAnimations = _ => {
    towerBullets.children.forEach( bullet =>  {
        game.physics.arcade.accelerateToObject(bullet, enemies, ENEMY_BULLET_ACCEL);
    });
  };

  const handleTowerActions = _ => {
      towers.children.forEach( enemy => randomTowerFire(enemy) );
  };


  
  function clicked(e){
    console.log(game.input._x, game.input._y);
    let x = game.input._x;
    let y = game.input._y;
    let spawnTower = towers.add( game.add.image(x, y, 'tower') );
    spawnTower.anchor.setTo(0.5, 0.5);
  }

  const handleEnemyActions = _ => {
      enemies.children.forEach( enemy => {
        if(enemy.x <= 260 && enemy.y === 140){
          enemy.x += ENEMY_SPEED;
        }
        if(enemy.x === 260 && enemy.y <= 320){
          enemy.y += ENEMY_SPEED;
          enemy.angle = 90;
        }
        if(enemy.y === 320 && enemy.x <= 445 && enemy.x <= 500){
          enemy.x += ENEMY_SPEED;
          enemy.angle = 0;
        }
        if(enemy.x === 445 && enemy.y >= 140 && enemy.y <= 390){
          enemy.y -= ENEMY_SPEED;
          enemy.angle = -90;
        }
        if(enemy.y === 140 && enemy.x <= 895 && enemy.x >= 390){
          enemy.x += ENEMY_SPEED;
          enemy.angle = 0;
        }
        if(enemy.x === 895 && enemy.y <= 330){
          enemy.y += ENEMY_SPEED;
          enemy.angle = 90;
        }
        if(enemy.y === 330 && enemy.x >= 640){
          enemy.x -= ENEMY_SPEED;
          enemy.angle = 180;
        }
        if(enemy.x === 640 && enemy.y <= 455 && enemy.y >= 330){
          enemy.y += ENEMY_SPEED;
          enemy.angle = 90;
        }
        if(enemy.y === 455 && enemy.x >= 130){
          enemy.x -= ENEMY_SPEED;
          enemy.angle = 180;
        }
        if(enemy.x === 130 && enemy.y <= 645 && enemy.y >= 200){
          enemy.y += ENEMY_SPEED;
          enemy.angle = 90;
        }
        if(enemy.y === 645 && enemy.x <= 765){
          enemy.x += ENEMY_SPEED;
          enemy.angle = 0;
        }
        if(enemy.x === 765 && enemy.y >= 520){
          enemy.y -= ENEMY_SPEED;
          enemy.angle = -90;
        }
        if(enemy.y === 520 && enemy.x <= 1030 && enemy.x >= 715){
          enemy.x += ENEMY_SPEED;
          enemy.angle = 0;
        }
    });

  };

  const update = _ => {
    randomlySpawnEnemy();
    handleEnemyActions();
    handleBulletAnimations();
    handleTowerActions();
  };




  const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });

})(window.Phaser);