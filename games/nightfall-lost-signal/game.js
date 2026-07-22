const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;


// PLAYER 🧍

let player = {
    x:400,
    y:300,
    size:28,
    speed:4,
    health:100
};


// CAMERA

let camera = {
    x:0,
    y:0
};


// WORLD

let world = {
    width:2500,
    height:2500
};


// TREES 🌲

let trees=[];

for(let i=0;i<120;i++){

    trees.push({
        x:Math.random()*world.width,
        y:Math.random()*world.height,
        size:40
    });

}


// SIGNAL 📡

let signal={
    x:1600,
    y:1500,
    size:35,
    found:false
};


// TOWER 🗼

let tower={
    x:2100,
    y:400,
    size:50
};


// MONSTER 👁️

let monster={
    x:1200,
    y:1200,
    size:35
};



let gameOver=false;
let victory=false;


// KEYS

let keys={};


addEventListener("keydown",e=>{
    keys[e.key.toLowerCase()]=true;
});


addEventListener("keyup",e=>{
    keys[e.key.toLowerCase()]=false;
});



// SNOW ❄️

let snow=[];

for(let i=0;i<220;i++){

    snow.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        speed:Math.random()*2+1
    });

}



// START

function startGame(){

    document.getElementById("menu").style.display="none";
    canvas.style.display="block";

    gameLoop();

}



// COLLISION

function collision(a,b){

return(
a.x < b.x+b.size &&
a.x+a.size>b.x &&
a.y < b.y+b.size &&
a.y+a.size>b.y
);

}



// DISTANCE

function distance(a,b){

return Math.hypot(
a.x-b.x,
a.y-b.y
);

}



// UPDATE

function update(){

if(gameOver || victory) return;



// MOVEMENT

if(keys["w"]||keys["arrowup"])
player.y-=player.speed;


if(keys["s"]||keys["arrowdown"])
player.y+=player.speed;


if(keys["a"]||keys["arrowleft"])
player.x-=player.speed;


if(keys["d"]||keys["arrowright"])
player.x+=player.speed;



// SIGNAL

if(collision(player,signal)){

signal.found=true;

}



// MONSTER AI

let dx=player.x-monster.x;
let dy=player.y-monster.y;

let dist=Math.hypot(dx,dy);


monster.x += dx/dist*1.5;
monster.y += dy/dist*1.5;



if(distance(player,monster)<60){

player.health-=0.6;

}


if(player.health<=0){

gameOver=true;

}



// TOWER

if(signal.found && collision(player,tower)){

victory=true;

}



// CAMERA

camera.x=
player.x-canvas.width/2;

camera.y=
player.y-canvas.height/2;



// SNOW

for(let s of snow){

s.y+=s.speed;


if(s.y>canvas.height){

s.y=0;
s.x=Math.random()*canvas.width;

}

}


}



// DRAW

function draw(){


ctx.fillStyle="#020205";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);



ctx.save();

ctx.translate(
-camera.x,
-camera.y
);



// 🌲 TREES

ctx.font="30px Arial";

for(let t of trees){

ctx.fillText(
"🌲",
t.x,
t.y
);

}



// 📡 SIGNAL

if(!signal.found){

ctx.shadowBlur=20;
ctx.shadowColor="cyan";

ctx.font="32px Arial";

ctx.fillText(
"📡",
signal.x,
signal.y
);

ctx.shadowBlur=0;

}



// 🗼 TOWER LIGHT

ctx.shadowBlur=35;
ctx.shadowColor="yellow";

ctx.font="45px Arial";

ctx.fillText(
"🗼",
tower.x,
tower.y
);

ctx.shadowBlur=0;



// 👁️ MONSTER

ctx.font="30px Arial";

ctx.fillText(
"👁️",
monster.x,
monster.y
);



// 🧍 PLAYER

ctx.font="28px Arial";

ctx.fillText(
"🧍",
player.x,
player.y
);



ctx.restore();



// FLASHLIGHT

let light =
ctx.createRadialGradient(
canvas.width/2,
canvas.height/2,
40,
canvas.width/2,
canvas.height/2,
280
);


light.addColorStop(
0,
"rgba(255,255,255,.35)"
);


light.addColorStop(
1,
"rgba(0,0,0,.96)"
);


ctx.fillStyle=light;

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);



// ❄️ SNOW PARTICLES

ctx.fillStyle="white";

for(let s of snow){

ctx.fillRect(
s.x,
s.y,
2,
5
);

}



// UI

ctx.fillStyle="white";
ctx.font="20px Arial";


ctx.fillText(
"❤️ Health: "+Math.floor(player.health),
30,
40
);


ctx.fillText(
signal.found?
"Go to 🗼":
"Find 📡 Lost Signal",
30,
70
);



// END

if(gameOver){

ctx.fillStyle="red";
ctx.font="50px Arial";

ctx.fillText(
"YOU WERE FOUND 👁️",
canvas.width/2-220,
canvas.height/2
);

}


if(victory){

ctx.fillStyle="cyan";
ctx.font="45px Arial";

ctx.fillText(
"SIGNAL RESTORED 📡",
canvas.width/2-220,
canvas.height/2
);

}

}



// LOOP

function gameLoop(){

update();
draw();

requestAnimationFrame(gameLoop);

}