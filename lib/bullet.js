(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(pos, dir, game){
    vel = [dir[0]*45, dir[1]*45];
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR, game);
  }
  Bullet.RADIUS = 2;
  Bullet.COLOR = "black";
  Asteroids.Util.inherits(Asteroids.MovingObject,Bullet);

  Asteroids.Bullet.prototype.move = function(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.isOutOfBounds()){
      this.game.remove(this);
    }

  }

})();
