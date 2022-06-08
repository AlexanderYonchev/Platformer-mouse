'use strict'

const Game = new Phaser.Game(600, 750, Phaser.AUTO, 'game-canvas', { preload, create, update })
let speed = 3
let mishok
let keys
let floor
let bird
let coin 
let platforms
let touching_ground
let touching_platforms
let dir
let moving_platforms
let text
let texttime
let finallFloor
let finallFloor_touching
let finall_text
let finall_text_touching
let congratsss
let food
let pizza_score
let score = 0
let pizza
let mishok_pizza_touching
let bottom_touching
let deadzone
let birdg
let birdf

function preload() {
    Game.load.image('background','photos/download.jpg');
    Game.load.spritesheet('mouse','photos/mouse.png', 192/4,192/4);
    Game.load.spritesheet('floor','photos/cheese platform.png')
    Game.load.spritesheet('finallFloor','photos/floor.png')
    Game.load.spritesheet('finish','photos/finish.png')
    Game.load.spritesheet('pizza','photos/pizza.png')
    Game.load.spritesheet('pile','photos/pile.png', 1280/8,480/3)
    keys = Game.input.keyboard.createCursorKeys();
}

function create() {
    worldCreate()
    floor_create()
    sentences()
    finall_platform()
    finnale_create()
    Score()
    
}


function update() { 
    physics()
    mishok_contols()
    pizza_killing()
    
   
   
}


function worldCreate() {
    let bg = Game.add.sprite(0,0,'background')
    Game.world.setBounds(0,0,600,4500)
    bg.width = Game.world.width
    bg.height = Game.world.height  
    Game.physics.startSystem(Phaser.Physics.P2JS); 
    mishok_create_animation()
    Game.camera.follow(mishok);
    deadzone = Game.camera.deadzone = new Phaser.Rectangle(0, 300, 600, 500);
   
    mini_platforms_create()
    Pizza()
    //bird_create()
    //bird_killer()
}

function mini_platforms_create(){
    platforms = Game.add.group()
    platforms.enableBody = true
    
    for(let y = 250; y < Game.world.height - 150; y += Game.rnd.integerInRange(70,150)){
        let x = Game.rnd.integerInRange(100,300)
        platforms.create(x,y,'floor')
    }

    platforms.forEach(function(p){
        p.scale.setTo(0.2);
        p.body.immovable = true
        p.body.allowGravity = false;
        p.body.setSize(800,-50,20,0) 
        moving_platforms = Game.add.tween(p).to({x:Game.rnd.integerInRange(-100,600)},600,Phaser.Easing.Linear.None,true,30000,1000,true)
    })
}

function physics(){
    Game.physics.startSystem(Phaser.Physics.ARCADE);
    Game.physics.enable(mishok,Phaser.Physics.ARCADE);
    Game.physics.enable(finallFloor,Phaser.Physics.ARCADE);
    mishok.body.collideWorldBounds = true;
    mishok.body.bounce.y = 0.2;
    Game.physics.arcade.gravity.y = 200;
    mishok.body.velocity.x = 0;
    touching_platforms = Game.physics.arcade.collide(mishok, platforms)
    touching_ground = Game.physics.arcade.collide(mishok, floor)
    finallFloor_touching = Game.physics.arcade.collide(mishok, finallFloor)
    finall_text_touching = Game.physics.arcade.collide(mishok, finall_text)
    mishok_pizza_touching = Game.physics.arcade.collide(mishok, food,function(p,pizza){},null,this)} 

function mishok_create_animation(){
 mishok = Game.add.sprite(5,Game.world.height, 'mouse');
    mishok.animations.add('right',[8,9,10,11],10,true);
    mishok.animations.add('left',[4,5,6,7],10,true);
    mishok.animations.add('static', [0,1],5,true);
    mishok.anchor.set(5);
}

function mishok_contols(){
    if(keys.up.isDown && touching_ground){
     mishok.body.velocity.y = -200;
    }else if(keys.up.isDown && touching_platforms){
        mishok.body.velocity.y = -220;
    }else if(keys.up.isDown && finallFloor_touching){
        mishok.body.velocity.y = -220;
    }else if(keys.up.isDown && finall_text_touching){
       congrats()
    }else if(keys.right.isDown){
        mishok.animations.play('right')
        mishok.x += speed;
    }else if (keys.left.isDown){
        mishok.animations.play('left')
        mishok.x -= speed;
    }else{
        mishok.animations.play('static');
    }
 }


function floor_create(){
    floor = Game.add.sprite(0,0,'floor');
    floor.width = Game.width
    floor.height = 110
    floor.y = 4380
    Game.physics.arcade.enable(floor);
    floor.body.immovable = true;
    floor.body.allowGravity = false;  
}
 
function sentences(){
    text = Game.add.text(105, 4395, 'Get to the top as fast as you can \n and make the highest score! \nAfter it 1min and 30sec it gets harder' );
    text.font = 'Showcard Gothic';
    text.fontSize = 20;
    text.align = 'center'
    text.fontWeight = 'bold';
    text.strokeThickness = 3;
    text.fill = '#00fbff';
    text.addStrokeColor('black', 63);
    text.addColor('#f54242', 63);

}

function finall_platform(){
    finallFloor = Game.add.sprite(330,130,'finallFloor');
    Game.physics.arcade.enable(finallFloor)
    finallFloor.body.immovable = true;
    finallFloor.body.allowGravity = false;
    finallFloor.scale.setTo(0.3);
    finallFloor.body.setSize(800,80,30,20)
    
}
    
function finnale_create(){
    finall_text = Game.add.sprite(290,-10,'finish');
    Game.physics.arcade.enable(finall_text);
    finall_text.body.immovable = true;
    finall_text.body.allowGravity = false;  
    finall_text.scale.setTo(0.8)
    finall_text.body.setSize(800,35,30,20)
}

function congrats(){
congratsss = Game.add.text(0,350,'CONGRATULATIONS')
congratsss.font = 'Wide Latin'
congratsss.strokeThickness = 4;
congratsss.fill = 'red'
congratsss.fontSize = 30;
}

function Pizza(){
food = Game.add.group()
food.enableBody = true
for(let y = 250; y < Game.world.height - 150; y += Game.rnd.integerInRange(20,250)){
    let x = Game.rnd.integerInRange(0,500)
    food.create(x,y,'pizza')
}

food.forEach(function(pizza){
    pizza.scale.setTo(0.1);
    pizza.body.immovable = true
    pizza.body.allowGravity = false;
    pizza.body.setSize(0,-50,150,0) 
})
}

function Score(){
pizza_score = Game.add.text(200,500,"Score: 0")
pizza_score.fixedToCamera = true
pizza_score.cameraOffset.setTo(10,10)
pizza_score.fill = 'white' 
pizza_score.font = 'Showcard Gothic'
pizza_score.strokeThickness = 3;
pizza_score.addStrokeColor = 'white'
}

function pizza_killing(){
    if(mishok_pizza_touching){
        Game.physics.arcade.collide(mishok, food, function(player1,pizza){
            pizza.kill()
            score ++
            pizza_score.setText('Score: '+ score);
       })
    }
}

/*function bird_create(){
   bird = Game.add.sprite(10,4180,'pile')
   bird.animations.add('up',[8,9,10,11,12,13,14,15],30,true);
   bird.scale.setTo(0.3,0.3)
}

function bird_killer(){
    birdg = Game.add.group()
    birdg.enableBody = true
    for(let y = 250; y < Game.world.height - 150; y += Game.rnd.integerInRange(20,250)){
        let x = Game.rnd.integerInRange(0,500)
        birdg.create(x,y,'bird')
    
    }
    birdg.forEach(function(birdf){
        birdf.animations.play('up')
        birdf.scale.setTo(0.1);
        birdf.body.immovable = true
        birdf.body.allowGravity = false;
        birdf.body.setSize(0,-50,150,0) 
        
        
    })

}
*/