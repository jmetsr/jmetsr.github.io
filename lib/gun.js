(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Gun = Asteroids.Gun = function(pos,game){
    Asteroids.MovingObject.call(this, [100,100], [0,0], Gun.RADIUS, Gun.COLOR, game);
  }
  Gun.RADIUS = 7;
  Gun.COLOR = "green";
  Asteroids.Util.inherits(Asteroids.MovingObject,Gun);

})()
