(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Block = Asteroids.Block = function(pos,game){
    Asteroids.MovingObject.call(this, pos, [0,0], Block.RADIUS, Block.COLOR, game);
  }
  Block.RADIUS = 18;
  Block.COLOR = "brown";
  Asteroids.Util.inherits(Asteroids.MovingObject,Block);
  Block.prototype.draw = function (c) {
   c.fillStyle = this.color;
   c.fillRect(this.pos[0],this.pos[1],this.radius*2,this.radius*2);
  }
})()
