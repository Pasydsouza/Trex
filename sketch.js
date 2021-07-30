var START = 0,PLAY = 1,END = 2;
var gamestate = START;
var trex, trex_img,trex_coll;
var ground, ground_img;
var invisibleground;
var obstaclesGroup,ob1,ob2,ob3,ob4,ob5,ob6;
var cloudsGroup,cloud_img;
var gameOver,gameOver_;
var reset,reset_;
var score=0; 
 

function preload ()
{
  trex_img =loadAnimation ("trex1.png","trex3.png","trex4.png");
  trex_ = loadImage("trex1.png");
  trex_coll = loadAnimation("trex_collided.png");
  ground_img = loadAnimation ("ground2.png");
  cloud_img = loadImage("cloud.png");
  ob1 = loadImage ("obstacle1.png");
  ob2 = loadImage ("obstacle2.png");
  ob3 = loadImage ("obstacle3.png");
  ob4 = loadImage ("obstacle4.png");
  ob5 = loadImage ("obstacle5.png");
  ob6 = loadImage ("obstacle6.png");
  gameOver_ = loadImage("gameOver.png");
  reset_=loadImage("restart.png");
}
function setup() {
  createCanvas(600, 200);
  
  trex = createSprite (50,185,20,50);
  trex.addImage ("trex",trex_);
  trex.addAnimation ("Trex",trex_img);
  trex.addAnimation("trex_collided",trex_coll);
  trex.scale = 0.5;
  trex.debug=false ;
  trex.setCollider("circle",0,0,40)
  
  ground = createSprite (300,180);
  ground.addAnimation ("ground",ground_img);
 
  
  invisibleground = createSprite (300,190,600,10);
  invisibleground.visible = false;
  
  
      gameOver = createSprite(300,100);
      gameOver.addImage (gameOver_);
      gameOver.scale = 0.5;
      
      reset = createSprite(300,130);
      reset.addImage (reset_);  
      reset.scale= 0.5;
  
  obstaclesGroup = new Group ();
  cloudsGroup = new Group ()
}

function draw() {
  background(255);
  drawSprites();
  
  text("Score:"+score,500,20);
  if (gamestate === START)
  {
    ground.velocityX = 0;
    text ("Press 'space' to start",200,100);
    gameOver.visible=false;
    reset.visible=false;
    if (keyDown ("space")){
      gamestate = PLAY;
    }
  }
 if (gamestate === PLAY)
 {
   gameOver.visible=false;
    reset.visible=false;
  score=score+Math.round(getFrameRate()/60)
   
   trex.changeAnimation("Trex",trex_img);
   ground.velocityX = -4;
 
  if (ground.x<0)
  {
    ground.x = 300;
  }
  
  if (keyDown("space")&& trex.y>140)
  {
    trex.velocityY = -12;
  }
  trex.velocityY = trex.velocityY + 0.5;
  
   spawnclouds ();
  spawnobstacles();
   
  if (trex.isTouching (obstaclesGroup))
  {
    ground.velocityX = 0;
    gamestate = END; 
  }
 
 }
  
  if (gamestate === END)
    {
       gameOver.visible=true;
    reset.visible=true;
      
      trex.changeAnimation("trex_collided",trex_coll);
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      
      obstaclesGroup.setLifetimeEach(-1);
       cloudsGroup.setLifetimeEach(-1);
      
      
      if(mousePressedOver(reset)){
        restart();
      }
    }
  trex.collide (invisibleground);
  console.log(gamestate);
}

function spawnclouds ()
{
  if (frameCount%60 === 0){
  var cloud = createSprite (620,random(10,100),10,10);
  cloud.addImage ("cloud",cloud_img); 
  cloud.velocityX = -4;
    cloud.scale = 0.5
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth +=1;
    cloudsGroup.add(cloud);
}
}

function spawnobstacles()
{
  if (frameCount%100 === 0)
  {
    var obstacles = createSprite (620,165,10,10);
    obstacles.velocityX = -4;
    obstacles.lifetime =200;
    obstaclesGroup.add(obstacles);
    var rand = Math.round (random (1,6));
    switch (rand){
      case 1:
    obstacles.addImage (ob1);
        break;
     case 2:
    obstacles.addImage (ob2);
        break;
        case 3:
    obstacles.addImage (ob3);
        break;
        case 4:
    obstacles.addImage (ob4);
        break;
        case 5:
    obstacles.addImage (ob5);
        break;
        case 6:
    obstacles.addImage (ob6);
        break;
        default : break;
    }
    obstacles.scale = 0.5
  }
}

function restart (){
  gamestate = START;
  score=0;
 trex.changeAnimation ("trex",trex_);
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
}