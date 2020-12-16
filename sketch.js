var PLAY = 1 ;
var END = 0 ;
var gameState = PLAY ;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var monkey_collided , over
var forestImage , forest , gameoverImage

function preload(){
 
  monkey_collided = loadAnimation("Monkey_10.png") ;
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  forestImage = loadImage("jungle.jpg") ;
 
}



function setup() {
createCanvas(600 ,600) ;
  
  
forest = createSprite(300 ,250 ,600 ,600) ;
forest.addImage(forestImage) ;
forest.scale = 1.2;
forest.x = forest.width/2 ;
console.log(forest.x) ;
   
monkey = createSprite(50 , 500 ,20 ,20) ;
monkey.addAnimation("monkey" ,monkey_running) ;
monkey.scale = 0.145 ;

ground = createSprite(400 ,550 ,900 ,10) ;
ground.visible = false ;
  
bananaGroup = createGroup() ; 
obstaclesGroup = createGroup() ; 
    
monkey.setCollider("circle" , 0 ,0 , 250) ;
monkey.debug = false ;
    
score = 0 ; 
}

function draw() {
  background(220);
  
if(gameState === PLAY){
    forest.velocityX = -5 ;
    
 if(forest.x < 10){
    forest.x = forest.width/2 ;   
    }
 
     console.log(monkey.y) ;   
  
   
 if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach() ;
    score = score+2 ; 
   
    switch(score){
     case 10: monkey.scale = 0.16 ;
       break ;
     case 20: monkey.scale = 0.18 ;
       break ;
     case 30: monkey.scale = 0.20 ;
       break ;
     case 40: monkey.scale = 0.22 ;
       break ;
   }
} 
    
 if(keyDown("space")  && monkey.y >= 300){
    monkey.velocityY = -16 ;
   
    }

   monkey.velocityY = monkey.velocityY + 0.8  ;  
  
   rock() ; 
  
   food() ;   
  
  if(obstaclesGroup.isTouching(monkey)){
       monkey.scale = 0.13 ;
  }
}

  monkey.collide(ground) ;
  
drawSprites() ;

stroke("black") ;
fill("black") ;
textSize(20) ;
text("score:" +score , 450 , 50) ;

}


function food(){
 if(frameCount % 100  ===  0){
  var banana = createSprite(600 , 600 , 20 ,20) ;
  banana.addImage(bananaImage) ;
  banana.scale = 0.06 ;
  banana.velocityX = -(5 +3*score/20) ;
  banana.lifetime = 150 ; 
  
  banana.y = Math.round(random(320 ,400)) ;
   
  bananaGroup.add(banana) ; 
  } 
}


function rock(){
 if(frameCount % 300  ===  0){
  var obstacle = createSprite(600 , 510 , 20 ,20 ) ;
  obstacle.addImage(obstacleImage) ;
  obstacle.scale = 0.2 ;
  obstacle.velocityX = -(5 +3*score/20) ;
  obstacle.lifetime = 150 ;
   
  obstaclesGroup.add(obstacle) ;
  } 
}