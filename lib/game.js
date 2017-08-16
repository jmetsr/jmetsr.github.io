(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Game = Asteroids.game = function (){
    this.asteroidArr = [];
    this.bullets = [];
    this.points = 0;
    this.atractors = [];
    pos = Asteroids.Util.randomPos();
    this.ship = new Asteroids.Ship(pos,this);
    this.addAsteroids();
  }
  Game.DIM_X = 500; Game.DIM_Y = 500; Game.NUM_ASTEROIDS = 4;
  Game.prototype.dim_x = function(){ return Game.DIM_X }
  Game.prototype.dim_y = function(){ return Game.DIM_Y }
  Game.prototype.addAsteroids = function (){

    while (this.asteroidArr.length < Game.NUM_ASTEROIDS) {
      pos = Asteroids.Util.randomPos()
      this.asteroidArr.push(new Asteroids.Asteroid(pos,this));
    }
    this.hasGun = false;
    this.gun = new Asteroids.Gun([100,100],this);
    this.guns = [this.gun];
    this.level = Game.NUM_ASTEROIDS/2-1;
    this.blocks = [];
    this.addBlocks()

    for (i=1;i<this.level; i++){
      atractor = new Asteroids.Atractor(Asteroids.Util.randomPos(),this);
      this.atractors.push(atractor);
    }    
  }
  Game.prototype.addBlocks = function(){
    for (i=1;i<this.level/2; i++){
      console.log(i);
      cantColideWith = this.asteroidArr.concat(this.ship).concat([this.gun])
      block = new Asteroids.Block(Asteroids.Util.randomPos(),this);
      while (block.anyCollisions(cantColideWith)){
        block = new Asteroids.Block(Asteroids.Util.randomPos(),this)
      }
      this.blocks.push(block);
    }
  }
  Game.prototype.draw = function(c){
    c.clearRect(0,0,Game.DIM_X,Game.DIM_Y);
    for (var i = 0; i < this.allObjects().length;i++){
      this.allObjects()[i].draw(c);
    }
  }
  Game.prototype.moveObjects = function (){
    for (var i = 0; i < this.allObjects().length;i++){
      this.allObjects()[i].move();
    }
  }
  Game.prototype.checkCollisions = function(){
    for (var i=0; i < this.allObjects().length-1; i++){
      for (var j=i+1; j < this.allObjects().length; j++){
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  }
  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    this.points += 1;
    $('#points').html(this.points + " points");
    $('#level').html("level " + this.level);
    if (this.hasGun){
      this.ship.fireBullet();
    }
  }
  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid){
      this.points += 1000;
      var index = this.asteroidArr.indexOf(obj);
      this.asteroidArr.splice(index, 1);
      if (this.asteroidArr.length == 0){
        Game.NUM_ASTEROIDS += 2;
        this.addAsteroids();
      }
    }
    if (obj instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(obj);
      this.bullets.splice(index, 1);
    }
    if (obj instanceof Asteroids.Gun) {
      this.gun = null;
    }
  }
  Game.prototype.allObjects = function() {
    basicObjs = this.atractors.concat([this.ship]).concat(this.asteroidArr).concat(this.bullets);
    extraObjs = this.guns.concat(this.blocks);
    return basicObjs.concat(extraObjs)
   }
})();