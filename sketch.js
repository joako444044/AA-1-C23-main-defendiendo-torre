const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angle = 20
  angleMode(DEGREES);

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  
  for (var i = 0; i < balls.length; i++)
    {
      show_cannon_balls(balls[i]);
    }
  cannon.display();
}

function keyReleased(e){
  if (e.keyCode === DOWN_ARROW){
    console.log("hi");
    balls[balls.length - 1].shoot();
  }
}

function keyPressed(){
  if (keyCode === DOWN_ARROW)
    {
      var cannon_ball = new CannonBall(cannon.x + 5,cannon.y + 5);
      Body.setAngle(cannon_ball.body, cannon.angle);
      balls.push(cannon_ball);
      cannon_ball.trayector = [];
    }
}

function show_cannon_balls(ball){
  if (ball){
    ball.display();
  }

}