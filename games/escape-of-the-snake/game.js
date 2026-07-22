const player=document.getElementById("player");
const snake=document.getElementById("snake");
const light=document.getElementById("light");

const healthText=document.getElementById("health");
const timeText=document.getElementById("time");
const recordText=document.getElementById("record");

const menu=document.getElementById("difficulty");

const message=document.getElementById("message");
const result=document.getElementById("result");



let playerX=120;
let playerY=250;


let snakeX=700;
let snakeY=260;


let health=3;

let time=60;

let snakeSpeed=2.5;


let running=false;


let startTime;



// RECORD

let bestTime=localStorage.getItem(
"snakeRecord"
);


if(bestTime){

recordText.innerHTML=
bestTime+"s";

}

else{

recordText.innerHTML="--";

}





// MAP TREES

const trees=[

{x:50,y:90},
{x:260,y:70},
{x:700,y:180},
{x:450,y:450},
{x:800,y:370},
{x:700,y:70}

];





// START GAME

function startGame(mode){


menu.style.display="none";


running=true;


startTime=Date.now();



if(mode==="easy"){

time=90;

snakeSpeed=1.8;

}



if(mode==="normal"){

time=60;

snakeSpeed=2.5;

}



if(mode==="hard"){

time=45;

snakeSpeed=4;

}



timeText.innerHTML=time;



}






// MOVEMENT


document.addEventListener("keydown",(e)=>{


if(!running)return;



let oldX=playerX;

let oldY=playerY;



let speed=15;



if(e.key==="w")

playerY-=speed;



if(e.key==="s")

playerY+=speed;



if(e.key==="a")

playerX-=speed;



if(e.key==="d")

playerX+=speed;




playerX=Math.max(0,Math.min(850,playerX));

playerY=Math.max(0,Math.min(500,playerY));




if(checkTrees()){

playerX=oldX;

playerY=oldY;

}



updatePlayer();


});








function updatePlayer(){


player.style.left=
playerX+"px";


player.style.top=
playerY+"px";



light.style.left=
playerX+"px";


light.style.top=
playerY+"px";


checkDoor();


}








// TREE COLLISION


function checkTrees(){


return trees.some(tree=>{


return Math.hypot(

playerX-tree.x,

playerY-tree.y

)<60;


});


}








// SNAKE AI


function moveSnake(){


if(!running)return;




if(snakeX<playerX)

snakeX+=snakeSpeed;


if(snakeX>playerX)

snakeX-=snakeSpeed;




if(snakeY<playerY)

snakeY+=snakeSpeed;


if(snakeY>playerY)

snakeY-=snakeSpeed;





snake.style.left=
snakeX+"px";


snake.style.top=
snakeY+"px";





let distance=Math.hypot(

snakeX-playerX,

snakeY-playerY

);



if(distance<45){


health--;


healthText.innerHTML=
health;



playerX=120;

playerY=250;



updatePlayer();




if(health<=0)

lose();


}



}







// DOOR


function checkDoor(){


let distance=Math.hypot(

playerX-820,

playerY-450

);



if(distance<55)

win();



}







// TIMER


setInterval(()=>{


if(!running)return;



time--;


timeText.innerHTML=time;



if(time<=0)

lose();



},1000);








// GAME LOOP


setInterval(()=>{


moveSnake();


},30);









function win(){


running=false;



let finalTime=Math.floor(

(Date.now()-startTime)/1000

);



if(!bestTime || finalTime<bestTime){


localStorage.setItem(
"snakeRecord",
finalTime
);


recordText.innerHTML=
finalTime+"s";


result.innerHTML=
"🏆 NEW RECORD! "+finalTime+"s";


}

else{


result.innerHTML=
"🎉 YOU ESCAPED!";


}



message.style.display="block";


}








function lose(){


running=false;


result.innerHTML=
"🐍 THE SNAKE FOUND YOU";


message.style.display="block";


}







function restartGame(){


location.reload();


}
