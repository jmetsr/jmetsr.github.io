(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(){
    this.game = new Asteroids.game();
    this.paused = false;
  }

  game_view = new GameView();
  GameView.prototype.start = function(){
    var that = this;
    game_view.bindKeyHandlers();
    setInterval(function() {
    game_view.game.draw(c);
     if (!that.pauss()){
       game_view.game.step();
     }
   }, 20)
  }

  GameView.prototype.pauss = function(){
    return this.paused;
  }

  GameView.prototype.bindKeyHandlers = function(){
    var that = this;
    key('left', function(){
      game_view.game.ship.power([-7,0]);
    });
    key('up', function(){
      game_view.game.ship.power([0,-7]);
    });
    key('right', function(){
      game_view.game.ship.power([7,0]);
    });
    key('down', function(){
      game_view.game.ship.power([0,7]);
    });
    key('v',function(){
      if (that.paused){
        that.paused = false;
      } else {
        that.paused = true;
      }
    });
  }

  game_view.start();

})();
