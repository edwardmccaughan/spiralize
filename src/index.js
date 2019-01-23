import { MidiController } from './midi'
import { Orb } from './orb'
window.Sketch = require('sketch-js')

var orbs = []

window.sketch = Sketch.create()
window.center = {
      x: sketch.width / 2,
      y: sketch.height / 2
    }
window.dt = 1
window.clearAlpha = 10
window.clear = function(){
    sketch.clearRect( 0, 0, sketch.width, sketch.height ),
    orbs.length = 0; 
  }


var createOrb = function( config ){
  var x = ( config && config.x ) ? config.x : sketch.mouse.x,
      y = ( config && config.y ) ? config.y : sketch.mouse.y;
  orbs.push( new Orb( x, y, random(0,100)) );
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
  // var count = 100
  var count = 0
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

  orbs.forEach((orb) => {
    if(orb.alive) {
      orb.update();
    } else {
      orbs = orbs.filter(item => item !== orb)
    }
  })
};

sketch.draw = function(){
  sketch.save();
  sketch.translate( center.x, center.y );

  orbs.forEach((orb) => { orb.render(); })
  sketch.restore();
};


  
document.onselectstart = function(){
  return false;
};


var hue_for_midi_key = function(key) {
  // % 12 to figure out which key in the octave,
  // then split across the 360 of the color wheel
  return (key % 12) * 30
}

var key_down = function(key) {
  var hue = hue_for_midi_key(key)
  console.log(hue)
  var x = (sketch.width / 2 ) - (key * 8)
  var y = sketch.height / 2

  var orb = new Orb(
    x,
    y,
    hue)

  orbs.push(orb);
}

var key_up = function(key) {

}

new MidiController( (key) => { key_down(key) }, (key) => { key_up(key)} )





