export class Orb {
  constructor(x,y, hue) {
    this.hue = hue

    var dx = x - center.x
    var dy = y - center.y ;
    this.angle = atan2(dy, dx);
    this.lastAngle = this.angle;
    this.radius = sqrt( dx * dx + dy * dy );
    this.lineWidth = ( this.radius / 300 ) + 1;

    this.global_speed = 65
    this.speed_modifier = ( random( 1, 10 ) / 300000 ) * ( this.radius ) + 0.015;

    this.alive_time = 3000
    this.alive = true
    setTimeout(()=> { this.alive = false; console.log('dead')}, this.alive_time)
  }

  update(){  
    this.lastAngle = this.angle;
    this.angle += this.speed_modifier * ( this.global_speed / 50 ) * dt;
  };

  render(){ 
    sketch.strokeStyle = 'hsla( ' + this.hue + ', 100%, 50%, 1)';
    sketch.lineWidth = this.lineWidth;     
    sketch.beginPath();
    sketch.arc( 0, 0, this.radius, this.lastAngle, this.angle + 0.001, false );
    sketch.stroke();
    sketch.closePath();
  };

}