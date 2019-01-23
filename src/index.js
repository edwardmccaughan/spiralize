// import 'sketch-js'
window.Sketch = require('sketch-js')
import { Orb } from './orb'

var orbs = [],    
    opt = {
      total: 0,
      count: 100,
      spacing: 2,
      speed: 65,
      // scale: 1,
      clearAlpha: 10,
      orbitalAlpha: 100,
      clear: function(){
        sketch.clearRect( 0, 0, sketch.width, sketch.height ),
        orbs.length = 0; 
      }
    };

window.sketch = Sketch.create()
window.center = {
      x: sketch.width / 2,
      y: sketch.height / 2
    }
window.dt = 1




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
  while( opt.count-- ){
    createOrb( {
      x: random( sketch.width / 2 - 300, sketch.width / 2 + 300 ), 
      y: random( sketch.height / 2 - 300, sketch.height / 2 + 300 ) 
    } );
  };
};

sketch.clear = function(){
  sketch.globalCompositeOperation = 'destination-out';
  sketch.fillStyle = 'rgba( 0, 0, 0 , ' + ( opt.clearAlpha / 100 ) + ' )';
  sketch.fillRect( 0, 0, sketch.width, sketch.height );
  sketch.globalCompositeOperation = 'lighter';
};

sketch.update = function(){
  dt = ( sketch.dt < 0.1 ) ? 0.1 : sketch.dt / 16;
  dt = ( dt > 5 ) ? 5 : dt;
  var i = orbs.length;
  // opt.total = i;
  while( i-- ){ 
    orbs[i].update();
  }
};

sketch.draw = function(){
  sketch.save();
  sketch.translate( center.x, center.y );
  // sketch.scale( opt.scale, opt.scale );
  var i = orbs.length;
  while( i-- ){ 
    orbs[i].render(); 
  }
  sketch.restore();
};


  
document.onselectstart = function(){
  return false;
};







