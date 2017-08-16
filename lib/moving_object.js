(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }
  var MovingObject = Asteroids.MovingObject = function(pos,vel,radius,color, game){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  }
  MovingObject.prototype.draw = function (c) {
   c.fillStyle = this.color;
   c.beginPath();
   c.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI)
   c.fill();
  }
  MovingObject.prototype.move = function(){
    if (!(this instanceof Asteroids.Bullet)){
      Asteroids.Util.warp(this.pos,this.game.dim_x(), this.game.dim_y());
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    for (a in this.game.atractors){
      if ((this.vel[0]!=0)&&(this.vel[1]!=0)){
        atrac = this.game.atractors[a]
        dir = [atrac.pos[0]-this.pos[0],atrac.pos[1]-this.pos[1]];
        distance = (dir[0]**2+dir[1]**2)^0.5
        if (distance != 0){
          this.vel[0] += dir[0]*5/(distance^2);
          this.vel[1] += dir[1]*5/(distance^2);
        }
      }
    }
    if ((this.pos[0]== -Infinity)||(this.pos[0]== Infinity)){
      this.game.remove(this);
    }
  }
  MovingObject.prototype.isCollidedWith = function(otherObject){
    if (!(otherObject instanceof Asteroids.Block)){
      var distance = Math.pow(Math.pow((this.pos[0]-otherObject.pos[0]),2) + Math.pow((this.pos[1]-otherObject.pos[1]),2), 0.5);
      if (distance < this.radius + otherObject.radius){
        return true;
      }
      else{
        return false;
      }
    } else {
      var inTop = this.pos[1] - this.radius < otherObject.pos[1] + otherObject.radius*2;
      var inBottom = this.pos[1] + this.radius > otherObject.pos[1];
      var inLeft = this.pos[0] - this.radius < otherObject.pos[0] + otherObject.radius*2;
      var inRight = this.pos[0] + this.radius > otherObject.pos[0];
      return inTop && inLeft && inBottom && inRight;
    }

  }
  MovingObject.prototype.isInsideBlock = function(block){
    MARGIN = 2;
    var inTop = this.pos[1] - this.radius < (block.pos[1] + block.radius*2 - MARGIN);
    var inBottom = this.pos[1] + this.radius > (block.pos[1] - MARGIN);
    var inLeft = this.pos[0] - this.radius < (block.pos[0] + block.radius*2 - MARGIN);
    var inRight = this.pos[0] + this.radius > (block.pos[0] - MARGIN);
    return inTop && inLeft && inBottom && inRight;
  }
  MovingObject.prototype.collideWith = function(otherObject) {
    if (this instanceof Asteroids.Ship && otherObject instanceof Asteroids.Asteroid){
      this.relocate();
      Asteroids.game.call(this.game) //This resets the game
    }
    if (this instanceof Asteroids.Asteroid && otherObject instanceof Asteroids.Bullet){
      this.game.remove(this);
    }
    if (this instanceof Asteroids.Ship && otherObject instanceof Asteroids.Gun){
      this.game.hasGun = true;
      this.game.guns = [];
    }
    if (otherObject instanceof Asteroids.Block){
      this.reverseDirection();
      if (this.isInsideBlock(otherObject)){
        this.move()
      }
    }
  }
  MovingObject.prototype.isOutOfBounds = function(){
    pos = this.pos
    if (pos[0] > this.game.dim_x() || pos[0] < 0) {
      return true;
    }
    if (pos[1] > this.game.dim_y() || pos[1] < 0) {
      return true;
    }
    return false
  }
  MovingObject.prototype.reverseDirection = function(){
    this.vel[0] = this.vel[0]*-1;
    this.vel[1] = this.vel[1]*-1
  }
  MovingObject.prototype.anyCollisions = function(objs){
    for (ob in objs){
      if (this.isCollidedWith(objs[ob])){
        return true
      }
    }
    return false
  }
})();