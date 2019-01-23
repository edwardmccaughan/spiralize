export class Orb {
  constructor(x,y, hue, midi_key) {
    this.hue = hue
    this.midi_key = midi_key;

    var dx = x - center.x
    var dy = y - center.y ;
    this.startAngle = atan2(dy,dx);
    this.angle = this.startAngle;

    this.lastAngle = this.angle;
    this.radius = sqrt( dx * dx + dy * dy );
    this.lineWidth = ( this.radius / 300 ) + 1;

    this.global_speed = 65
    this.speed_modifier = ( random( 1, 10 ) / 300000 ) * ( this.radius ) + 0.015;

    this.still_pressed = true
    this.alive = true
    // this.alive_time = 3000
    // setTimeout(()=> { this.alive = false; console.log('dead')}, this.alive_time)

  }

  update(){  
    this.lastAngle = this.angle;
    this.angle += this.speed_modifier * ( this.global_speed / 50 ) * dt;

    if(!this.still_pressed) {
      console.log('released')
      this.alive_time = 3000
      this.alive = true
      setTimeout(()=> { this.alive = false; console.log('dead')}, this.alive_time)
    }
  };

  render(){ 
    sketch.lineWidth = this.lineWidth;     
    
    if(this.still_pressed) {
      // draw the tail all the way from the point it started (which is probably 0 :-p )
      // use a lot of opacity or it looks like a solid line
      sketch.beginPath();
      sketch.strokeStyle = 'hsla( ' + this.hue + ', 100%, 50%, 0.04)';
      sketch.arc( 0, 0, this.radius, this.startAngle, this.angle + 0.001, false );
      sketch.stroke();
      sketch.closePath();
    }

    sketch.beginPath();
    sketch.strokeStyle = 'hsla( ' + this.hue + ', 100%, 50%, 1)';
    sketch.arc( 0, 0, this.radius, this.lastAngle, this.angle + 0.001, false );
    
    sketch.stroke();
    sketch.closePath();
  };

}