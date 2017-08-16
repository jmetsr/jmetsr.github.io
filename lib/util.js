(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  if (typeof Asteroids.Util === "undefined"){
    window.Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function (BaseClass,childclass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    childclass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function(){
    return [10*(Math.random()) - 5, 10*(Math.random()) - 5];
  };

  Asteroids.Util.randomPos = function(){
    return [Math.random() * 500, Math.random() * 500];
  }
  Asteroids.Util.warp = function(pos, x_dim, y_dim){
    if (pos[0] > x_dim) {
      pos[0] -= x_dim;
    }
    else if (pos[0] < 0){
      pos[0] += x_dim;
    }

    if (pos[1] > y_dim) {
      pos[1] -= y_dim;
    }
    else if (pos[1] < 0){
      pos[1] += y_dim;
    }
    return pos;
  }

})();
