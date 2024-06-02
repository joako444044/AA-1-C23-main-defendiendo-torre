class Boat{
     constructor(x,y,height,width,animation){
         var options = {
            restitution:0.8,
            friction:1,
            density:1
         }
         this.body = Bodies.rectangle(x,y,width,height,options);
         World.add(world,this.body);
         this.width = width;
         this.height = height;
      
         this.speed = 0.05;
         this.animation = animation
     }

     show(){
        var pos = this.body.position;
        var angle = this.body.angle;
        var index1 = floor(this.speed % this.animation.length); 
        push();
          translate(pos.x,pos.y);
          rotate(angle);
          imageMode(CENTER);
          image(this.animation[index1],0,-40,this.width,this.height);
        pop();
     }
     remove(index){
      
      setTimeout(() => {
         Matter.World.remove(world,this.body);
         delete boats[index];
         },2000);
     
     }

     animate(){
      this.speed += 0.05;
     }
}