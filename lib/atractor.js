(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Atractor = Asteroids.Atractor = function(pos,game){
    vec = Asteroids.Util.randomVec()
    vel =[vec[0]*0.2,vec[1]*0.2]
    Asteroids.MovingObject.call(this, pos, vel, Atractor.RADIUS, Atractor.COLOR, game);
  }
  Atractor.RADIUS = 30;
  Atractor.COLOR = "orange";

  Asteroids.Util.inherits(Asteroids.MovingObject,Atractor);

})()
