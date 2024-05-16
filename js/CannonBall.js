class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    World.add(world, this.body);
    this.trayector = [];
  }

  shoot(){
    
    var new_angle = (cannon.angle - 30) * (3.14 / 180);
    var velosity = p5.Vector.fromAngle(new_angle);
    velosity.mult(0.5);
    Matter.Body.setStatic(this.body, false)
    Matter.Body.setVelocity(this.body, {x:velosity.x * (180 / 3.14),y:velosity.y * (180 / 3.14)});
    
  }
  display() 
  {
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();
    if (this.body.velocity.x > 0 && pos.x > 10)
    {
      this.trayector.push([pos.x,pos.y]);

    }
    
    for (var t = 0; t < this.trayector.length; t++){
      image(this.image, this.trayector[t][0],this.trayector[t][1] - 10, 10, 10);

    
    }
  }
}
