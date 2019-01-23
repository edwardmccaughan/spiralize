// import 'sketch-js'
window.Sketch = require('sketch-js')
import { Orb } from './orb'

var orbs = []

window.sketch = Sketch.create()
window.center = {
      x: sketch.width / 2,
      y: sketch.height / 2
    }
window.dt = 1
window.clearAlpha = 10
window.clear: function(){
    sketch.clearRect( 0, 0, sketch.width, sketch.height ),
    orbs.length = 0; 
  }


var createOrb = function( config ){
  var x = ( config && config.x ) ? config.x : sketch.mouse.x,
      y = ( config && config.y ) ? config.y : sketch.mouse.y;
  orbs.push( new Orb( x, y ) );
};

var turnOnMove = function(){
  sketch.mousemove = createOrb; 
};

var turnOffMove = function(){
  sketch.mousemove = null;  
};

sketch.mousedown = function(){
  createOrb();
  turnOnMove();
};

sketch.mouseup = turnOffMove;

sketch.resize = function(){
  center.x = sketch.width / 2;
  center.y = sketch.height / 2;
  sketch.lineCap = 'round';
};

sketch.setup = function(){  
  var count = 100
  while( count-- ){
    createOrb( {
      x: random( sketch.width / 2 - 300, sketch.width / 2 + 300 ), 
      y: random( sketch.height / 2 - 300, sketch.height / 2 + 300 ) 
    } );
  };
};

sketch.clear = function(){
  sketch.globalCompositeOperation = 'destination-out';
  sketch.fillStyle = 'rgba( 0, 0, 0 , ' + ( clearAlpha / 100 ) + ' )';
  sketch.fillRect( 0, 0, sketch.width, sketch.height );
  sketch.globalCompositeOperation = 'lighter';
};

sketch.update = function(){
  dt = ( sketch.dt < 0.1 ) ? 0.1 : sketch.dt / 16;
  dt = ( dt > 5 ) ? 5 : dt;
  var i = orbs.length;
  while( i-- ){ 
    orbs[i].update();
  }
};

sketch.draw = function(){
  sketch.save();
  sketch.translate( center.x, center.y );
  var i = orbs.length;
  while( i-- ){ 
    orbs[i].render(); 
  }
  sketch.restore();
};


  
document.onselectstart = function(){
  return false;
};







