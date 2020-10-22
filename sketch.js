var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage,obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(80,150,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1;
  
  if(gameState===PLAY){
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  //ground.x = ground.width/2;
  console.log(ground.x);
  }
 // monkey.collide(ground);
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  score=0;
  survivalTime=0;
  
  monkey.debug = true;
}


function draw() {
  background("white");
  //text("Score: "+ score, 500,50);
  if(ground.x>0){
    ground.x=ground.width/2;
  }
  if(gameState===PLAY){
    stroke("black");
  textSize(10);
  fill("black");
  text("Score:"+score,330,50);
  
  stroke("black");
  textSize(20);
  fill("black");
    survivalTime = 0;
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,130,50);
  if(keyDown("space")&&monkey.y>=150){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  spawnFood();
  spawnObstacles ();
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score=score+1;
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  if(gameState===END){
    ground.velocityX=0;
    obstacle.velocityX=0; 
    monkey.pause();
    monkey.collide(ground);
    FoodGroup.destroyEach();
    textSize(20);
    text("Press R to restart",125,200);
   monkey.velocityY = 0; 
    survivalTime = 0;  
      
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
      
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
    
    if(keyDown("R")){
    reset();
    }
      
  }
  
  drawSprites();   
}
function spawnFood(){
  if(frameCount%80===0){
    fruit=createSprite(400,165,10,40);
    fruit.velocityX=-5;
    fruit.addImage("moving",bananaImage);
    fruit.scale=0.1;
    fruit.y=Math.round(random(120,200));
    FoodGroup.add(fruit);
  }
}
function spawnObstacles(){
    if(frameCount%300===0){
    obstacle=createSprite(400,325,10,40);
    obstacle.collide(ground); 
    obstacle.velocityX=-5;
    obstacle.addImage("moving",obstacleImage);
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
    
  }
}
function reset(){
  gameState=PLAY;
  score=0;
  survivalTime=0;
  monkey.play();
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
}



