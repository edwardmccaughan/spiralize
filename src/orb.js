export class Orb {
  constructor(x,y) {

    this.opt_speed = 65
    this.color_alpha = 100;

    var dx = x - center.x
    var dy = y - center.y ;
    this.angle = atan2( dy, dx );
    this.lastAngle = this.angle;
    this.radius = sqrt( dx * dx + dy * dy );
    this.size = ( this.radius / 300 ) + 1;
    this.speed = ( random( 1, 10 ) / 300000 ) * ( this.radius ) + 0.015;
  }

  update(){  
    this.lastAngle = this.angle;
    this.angle += this.speed * ( this.opt_speed / 50 ) * dt;
    // this.x = this.radius * cos( this.angle ); // not currently using these, but maybe it's useful someday
    // this.y = this.radius * sin( this.angle );
  };

  render(){ 
    // pretty sure this just fixes jitter making negative radius
    // radius = ( opt.jitterRadius != 0 && radius < 0 ) ? 0.001 : radius;
    sketch.strokeStyle = 'hsla( ' + (( this.angle + 90 ) / ( PI / 180 )) + ', 100%, 50%, ' + ( this.color_alpha / 100 ) + ' )';
    sketch.lineWidth = this.size;     
    sketch.beginPath();
    sketch.arc( 0, 0, this.radius, this.lastAngle, this.angle + 0.001, false );
    sketch.stroke();
    sketch.closePath();
  };

}