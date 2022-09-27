//GAME CONSTANTS & VARIABLES
// initail
let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio("../Music/food.mp3");
const gameOverSound = new Audio("../Music/gameover.mp3");
const moveSound = new Audio("../Music/move.mp3");
const musicSound = new Audio("../Music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  //head of snake
  { x: 13, y: 15 }
];
//food of snakke
food = { x: 6, y: 7 };

//GAME FUNCTIONS
function main(currTime) {
  window.requestAnimationFrame(main);
//   console.log(currTime);
  if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currTime;
  gameEngine();
}


function isCollide(snake) {
    //if you come into yourself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        } 
    }
    //if you bump into wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }

        return false;
}
function gameEngine() {
  musicSound.play();
  // PART 1: Updating the snake array and food
  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("Game Over. Tap any key to play again.");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    
  }

  //if you have eaten the food, increment the score and regenerate the food
// when  head === food 
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
    foodSound.play();
    score = score + 1;
    if(score > hiScoreVal){
        hiScoreVal = score;
        localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
        highScoreBox.innerHTML = "HiScore: " + hiScoreVal;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y})
    //random number between a and b
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
  }

  //moving the snake
  for(let i = snakeArr.length - 2; i >= 0; i--){
    //i+1 -> last elemnt
    snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;


  // PART 2: Display the snake and food
  // Display the snake
  board.innerHTML = ""; //make board clean
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0){
        snakeElement.classList.add('head');
    } else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

//MAIN LOGIC STARTS HERE
musicSound.play();
let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
}else{
    hiScoreVal = JSON.parse(hiScore);
    highScoreBox.innerHTML = "HiScore: " + hiScore;
}
//it will fire main
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = {x: 0, y: 1} //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
    
        default:
            break;
    }
});
