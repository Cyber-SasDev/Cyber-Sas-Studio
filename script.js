const snow = document.querySelector(".snow");


for(let i=0;i<120;i++){


let flake=document.createElement("span");


flake.innerHTML="❄";


flake.style.left=Math.random()*100+"vw";


flake.style.fontSize=
Math.random()*15+10+"px";


flake.style.opacity=
Math.random();


flake.style.animationDuration=
Math.random()*5+5+"s";


flake.style.animationDelay=
Math.random()*5+"s";


snow.appendChild(flake);


}




const aboutBtn =
document.getElementById("aboutBtn");


const aboutBox =
document.getElementById("aboutBox");


const closeAbout =
document.getElementById("closeAbout");



aboutBtn.onclick=()=>{

aboutBox.style.display="flex";

};



closeAbout.onclick=()=>{

aboutBox.style.display="none";

};