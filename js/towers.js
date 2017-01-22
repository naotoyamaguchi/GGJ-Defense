((Phaser, Game) => {
  if(Game === undefined){
    Game = window.Game = {};
  }

  Game.Tower = class{
    constructor(worldX, worldY, tileX, tileY, tile){
      this.tower = game.add.sprite(worldX, worldY, tile);
      this.tower.worldX = worldX;
      this.tower.worldY = worldY;
      this.tower.tileX = tileX;
      this.tower.tileY = tileY;
      this.tower.tile = tile;
      this.tower.fireTime = 2000;
      this.tower.fireLastTime = game.time.now + this.tower.fireTime;
      towers.add(this.tower);
      tileForbidden.push(index);
    }

    add(pointer) {
      game.input.onDown.add(Tower.prototype.posit, this);
    }

    position(pointer) {
      var tileworldX = pointer.worldX - (pointer.worldX % tileSquare);
      var tileworldY = pointer.worldY - (pointer.worldY % tileSquare);
      var tileX = Math.floor(pointer.worldX / tileSquare);
      var tileY = Math.floor(pointer.worldY / tileSquare);
    }

    fire(tower) {
      bullets.createMultiple(1, 'bullet', 0, false);
      if (game.time.now > tower.fireLastTime) {
          var bullet = bullets.getFirstExists(false);
          if (bullet && typeof enemys.children[0] != "undefined") {
              bullet.reset(tower.x, tower.y);
              bullet.body.collideWorldBounds = true;
              bullet.rotation = parseFloat(game.physics.arcade.angleToXY(bullet, enemys.children[0].x, enemys.children[0].y)) * 180 / Math.PI;
              game.physics.arcade.moveToObject(bullet, enemys.children[0], 500);
          }
          tower.fireLastTime = game.time.now + tower.fireTime;
      }
    }
  }

})(window.Phaser, window.Game)