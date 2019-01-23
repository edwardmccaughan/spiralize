export class Orb {
  constructor(x,y, hue, midi_key, midi_key_velocity) {
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
    const key_velocity_factor = midi_key_velocity / 2200000 
    // this.speed_modifier = (key_velocity_factor / 300000 ) * ( this.radius ) + 0.015;
    this.speed_modifier = key_velocity_factor  * ( this.radius ) + 0.015;
    console.log(midi_key_velocity, key_velocity_factor)


    //0.000021666666666666667 is a sane number for the speed modifier, fast makes motion sickness

    this.still_pressed = true
    this.alive = true
    this.dying = false
    this.alive_time = 3000

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

}