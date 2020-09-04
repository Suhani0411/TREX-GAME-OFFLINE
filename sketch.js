var trex,treximage,ground,groundimage,gamestate,PLAY,END;
var invisibleground,cloudimage,cloudGroup;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacleGroup,score,gameOverimg,restartimg;
var gameOver,restart,collided;

localStorage["HighestScore"] = 0;

function preload()
{
 treximage=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  collided=loadImage("trex_collided.png");
}


function setup() {
  createCanvas(600,200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running",treximage);
  trex.scale=0.6;
  trex.setCollider("circle",0,0,30); 
  
  PLAY=1;
  END=0;
  gamestate=PLAY;
  
  

  

 
  
  ground=createSprite(300,180,600,20);
  ground.addImage(groundimage);
  ground.x=ground.width/2; 
  
  invisibleground=createSprite(300,193,600,20);
  invisibleground.visible=false;
  
  cloudGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
   gameOver = createSprite(200,100);
  gameOver.addImage(gameOverimg);
gameOver.scale = 0.5;
  
 
restart = createSprite(200,140);
restart.addImage(restartimg);
restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
  
  
}

function draw() {
  
  background("white");
  score=score+Math.round(getFrameRate()/60);
  text("SCORE:" +score,340,100); 
//  text(mouseX+ ","+ mouseY,mouseX,mouseY);
  if (gamestate===PLAY){
    ground.velocityX=-6; 
    if(ground.x<0)
    {
     ground.x=ground.width/2; 
    
    }
  if(keyDown("space") && trex.y>=155)
  {
    
   trex.velocityY=-10;
    
  }
  trex.velocityY = trex.velocityY+0.5;
  spawnClouds();
  spawnObstacles();
  
    if(obstacleGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gamestate = END;
      //playSound("die.mp3");
    }
  
    
  }
  else if(gamestate === END) {
        
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
     trex.changeAnimation("collided",collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
   gameOver.visible = true;
    restart.visible = true;
    
     if(mousePressedOver(restart))
     {
      reset(); 
  }
    
  }
  
  
  console.log(trex.y);
  trex.collide(invisibleground);
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    var rand=Math.round(random(1,6));
    switch(rand)
    {
      case 1:obstacle.addImage(obstacle1);
        break;
       case 2:obstacle.addImage(obstacle2);
        break;
         case 3:obstacle.addImage(obstacle3);
        break;
         case 4:obstacle.addImage(obstacle4);
        break;
          case 5:obstacle.addImage(obstacle5);
        break;
          case 6:obstacle.addImage(obstacle6);
        break;
        
        default:break;
    }
  
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}

function reset()
{
  
  gamestate = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();

   if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  
  score = 0;
  
}
