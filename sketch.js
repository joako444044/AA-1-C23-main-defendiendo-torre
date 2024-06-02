const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var sailing_boat = [];
var crashing_boat = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  json_boats = loadJSON("./ship-sailing.json");
  img_boats = loadImage("./ship-sailing.png");
  json_crash = loadJSON("./broken-ship-01.json");
  img_crash = loadImage("./broken-ship-01.png");
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
  frame = json_boats.frames;
  for (i=0; i<frame.length; i++){
  pos = frame[i].frame;
  img = img_boats.get(pos.x, pos.y, pos.w, pos.h);
  sailing_boat.push(img);
  }
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

      show_cannon_balls(balls[i],i);
      collisionWithBoat(i);
    }
    cannon.display();
    spawn_boat()
  }
  
  function keyReleased(e){
    if (e.keyCode === DOWN_ARROW){
      console.log("hi");
      balls[balls.length - 1].shoot();

    }

  }
  
function keyPressed(e){
  if (e.keyCode === DOWN_ARROW)
    {
      var cannon_ball = new CannonBall(cannon.x + 5,cannon.y + 5);
      Body.setAngle(cannon_ball.body, cannon.angle);
      balls.forEach(element => {
        element.trayector = [];
      });
      cannon_ball.trayector = [];
      balls.push(cannon_ball);
      
    }
}

function show_cannon_balls(ball, index){
  if (ball){
    ball.display();
    if (ball.body.position.x > width || ball.body.position.y > height){
     ball.remove(index);
    }
  }

}

function spawn_boat(){
  if (boats.length > 0){
    if (boats[boats.length - 1] !== undefined && boats[boats.length - 1].body.position.x < width - 500){
      barco = new Boat(width + random([-40, -80, -120, -20]),height - 60, 200,200, sailing_boat);
      boats.push(barco);
      console.log("se ha anadido un nuevo barco")
    }
    for (var b = 0; b < boats.length; b++){
    if (boats[b] !== undefined){
    Body.setVelocity(boats[b].body, {x:-0.9,y:0});
    boats[b].show();
    boats[b].animate()
    }
    }
  }else{
    barco = new Boat(width - 100,height - 60, 200,200, sailing_boat);
    boats.push(barco);
  }
}
function collisionWithBoat(index){
  for (i = 0; i < boats.length; i++){
    if (balls[index] != undefined && boats[i] != undefined){
      var collition = Matter.SAT.collides(balls[index].body, boats[i].body);
      if (collition.collided){
      
        frame = json_crash.frames;
      for (k=0; k<frame.length; k++){
      pos = frame[k].frame;
      img = img_crash.get(pos.x, pos.y, pos.w, pos.h);
      crashing_boat.push(img);
      }
       boats[i].animation = crashing_boat;
        boats[i].remove(i);
        balls[index].remove(i);
      
        
      }
    }
  }
}