export class Orb {
  constructor(x,y, hue, midi_key, midi_key_velocity) {
    this.hue = hue
    this.midi_key = midi_key;
    this.midi_key_velocity = midi_key_velocity;

    var dx = x - center.x
    var dy = y - center.y ;
    this.startAngle = atan2(dy,dx);
    this.angle = this.startAngle;

    this.lastAngle = this.angle;
    this.radius = sqrt( dx * dx + dy * dy );
    this.lineWidth = ( this.radius / 300 ) + 1;

    this.global_speed = 65
    this.set_speed_modifier()

    this.still_pressed = true
    this.alive = true
    this.dying = false
    this.alive_time = 5000

  }

  update(){  
    this.lastAngle = this.angle;
    this.angle += this.speed_modifier * ( this.global_speed / 50 ) * dt;

    if(!this.still_pressed && !this.dying) {
      // this.alive = true
      this.dying = true
      setTimeout(()=> { this.alive = false;}, this.alive_time)
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

  set_speed_modifier(){
    // this was the original, with semi random. it looked cool, but was a bit dizzy inducing and
    // felt like there was less control for the user
    // this.speed_modifier = ( random( 1, 10 ) / 300000 ) * ( this.radius ) + 0.015;

    // using the velocity to affect the speed was kind of neat, but also disorientating
    // const key_velocity_factor = this.midi_key_velocity / 2200000 
    // this.speed_modifier = (key_velocity_factor / 300000 ) * ( this.radius ) + 0.015;

    // having a fixed number currently looks best. The value was arrived by trying random things until
    // I found a value that didn't make me dizzy :-p
    this.speed_modifier = (0.000000005 ) * ( this.radius ) + 0.015;
  }

}