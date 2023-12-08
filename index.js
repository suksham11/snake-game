// game constants and variables

let inputDir = {x: 0, y:0};
const foodsound = new Audio('foodsound.mp3');
const gamoversound = new Audio('gameover.wav');
const movesound = new Audio('move.wav');
const musicSound = new Audio('music.wav');
const board = document.getElementById('board');
let scoreElement = document.getElementById('score');

let speed = 7;
let score = 0;
let lastpaintTime = 0;
let snakeArr = [
   {x:13, y:15}
]
food = {x: 6, y:7};

//game functions
function main(ctime){
   window.requestAnimationFrame(main);
   //console.log(ctime);
   if((ctime - lastpaintTime)/1000 < 1/speed){
     return;
   }
   lastpaintTime = ctime;
   gameEngine();
}

function isCollide(snake){
      for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x  === snake[0].x && snake[i].y === snake[0].y >= 18 || snake[0].x <= 0){
          return true;
        }
      }
      // if this bump into the wall
      if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
          return true;
        }
}


function gameEngine(){
   // part1 updating the snake variable
   if(isCollide(snakeArr)){
      gamoversound.play();
      musicSound.pause();
      inputDir = {x: 0, y:0};
      alert("game over . press any key");
      snakeArr = [{x: 13, y:15}];
      musicSound.play();
      score = 0;
   }

    // if you have eaten the food incrememt the score and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x  === food.x){
      foodsound.play();
      score += 1;
      scoreBox.innerHTML = "Score: " + score;
      snakeArr.unshift({x: snakeArr[0].x + inputDir.x,  y: snakeArr[0].y + inputDir.y});
      let a = 2;
      let b = 16;
      food = {x:2 + Math.round(a+ (b-a)* Math.random()),y: Math.round(a+ (b-a)* Math.random())};
    }

// moving the snake 
  for (let i = snakeArr.length - 2; i >= 0 ; i--) {

   snakeArr[i+1] = {...snakeArr[i]};
  }

   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;


   // part2  render the snake and food
   // display the food
   board.innerHTML = "";
   snakeArr.forEach((e , index) =>{
     snakeElement = document.createElement('div')
     snakeElement.style.gridRowStart = e.y;
     snakeElement.style.gridColumnStart = e.x;
     
     if(index === 0 ){
       snakeElement.classList.add('head');
     }
     else{
       snakeElement.classList.add('snake');
     }
     board.appendChild(snakeElement);
   });
     // display the food
     foodElement = document.createElement('div')
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     

     
     foodElement.classList.add('food');
     board.appendChild(foodElement);


}


//main logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
  hiscorebox.innerHTML = "HiScore: " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
   inputDir = {x: 0 , y:1} //start the game koi bhi button dabae toh
   movesound.play();
   switch(e.key){
       case "ArrowUp":
           console.log("ArrowUp");
           inputDir.x = 0;
           inputDir.y = -1;
           break;

       case "ArrowDown":
           console.log("ArrowDown");
           inputDir.x = 0;
           inputDir.y = 1;
           break;

       case "ArrowLeft":
           console.log("ArrowLeft");
           inputDir.x = -1;
           inputDir.y = 0;
           break;

       case "ArrowRight":
           console.log("ArrowRight")
           inputDir.x = 1;
           inputDir.y = 0;
           break;
       default:
           break;
   }

});

