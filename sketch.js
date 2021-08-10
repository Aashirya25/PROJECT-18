var path,boy,cash,diamonds,jwellery,sword,end,win;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg,winImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var restartImg,restart;
//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
  winImg = loadImage("win.png")
  restartImg = loadImage("restart.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
end = createSprite(width-650,300,20,20);
end.addAnimation("SahilRunning",endImg);
end.scale=0.5;
end.visible = false

win = createSprite(width-650,250,20,20);
win.addAnimation("SahilRunning",winImg);
win.scale=0.5;
win.visible = false

restart = createSprite(width-640,400);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false; 
  
cashG= new Group();
diamondsG= new Group();
jwelleryG= new Group();
swordGroup= new Group();

boy.setCollider("circle",0,0,350);
//boy.debug = true
}

function draw() {
  
  if(keyDown("R")){
    end.visible = false
    win.visible = false
    treasureCollection = 0
    gameState = PLAY
  }

  if(gameState===PLAY){
   
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);


  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+150;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
        end.visible = true
        restart.visible = true
       cashG.destroyEach();
       cashG.setVelocityEach(0)

       diamondsG.destroyEach();
       diamondsG.setVelocityEach(0)

       jwelleryG.destroyEach();
       jwelleryG.setVelocityEach(0)

       swordGroup.destroyEach();
       swordGroup.setVelocityEach(0)
       if(mousePressedOver(restart)){
         reset();
       }
  }
}

    if (treasureCollection >= 1000){
      win.visible = true
      cashG.destroyEach();
      cashG.setVelocityEach(0)
  
         diamondsG.destroyEach();
         diamondsG.setVelocityEach(0)
  
         jwelleryG.destroyEach();
         jwelleryG.setVelocityEach(0)

         swordGroup.destroyEach();
         swordGroup.setVelocityEach(0)
    }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,20,30);
  text("Get all the cash,",230,30);
  text("jwellery and",230,50);
  text("diamonds but",230,70);
  text("avoid the swords ",230,90);
  text("Press R to restart",20,50)
  text("Get your treature ",20,70)
  text("to 1,000 to win",20,90)
}

if(mousePressedOver(restart)){
  reset();
}
}

function reset(){
  gameState = PLAY
  end.visible = false
  restart.visible = false; 
  treasureCollection = 0;
  cashG.destroyEach()
  diamondsG.destroyEach()
  jwelleryG.destroyEach()
  swordGroup.destroyEach()
}

function createCash() {
  if (World.frameCount % 210 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 220 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.18;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 100 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.19;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 90 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}