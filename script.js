playing = false;

let snake = [ 
    {x: 30, y: 0}, //head
    {x: 15, y: 0}, //segment
    {x: 0, y: 0} // tail
];
let inputQueue = [];

var apple = {x: Math.floor(Math.random()*34)*15, y: Math.floor(Math.random()*17)*15};

var dir = "right";

var score = 0;
var ate = false;

function move() {
    badInput = false;
    if(inputQueue.length > 0){
        if(inputQueue[inputQueue.length - 1] === "right" && dir === "left" ){
            badInput = true;
        }
        if(inputQueue[inputQueue.length - 1] === "left" && dir === "right" ){
            badInput = true;
        }
        if(inputQueue[inputQueue.length - 1] == "up" && dir === "down" ){
            badInput = true;
        }
        if(inputQueue[inputQueue.length - 1] === "down" && dir === "up" ){
            badInput = true;
        }
        if(badInput === false){
            dir = inputQueue.pop();
        }else{
            inputQueue.pop();
        }
    }

    let headX = snake[0].x;
    let headY = snake[0].y;

    if(dir === "right") {
        headX += 15;
    }
    if(dir === "left") {
        headX -= 15;
    }
    if(dir === "up") {
        headY -= 15;
    }
    if(dir === "down") {
        headY += 15;
    }

    snake.unshift({x: headX, y: headY});

    if(!ate){
        snake.pop();
    }
    ate = false;

    const canvas = document.getElementById("field");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";

    ctx.fillRect(snake[0].x, snake[0].y, 12, 12);
    ctx.fillStyle = "orange";
    for(i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i].x,snake[i].y, 12, 12);
    }
    console.log("x:", snake[0].x, "y:", snake[0].y)
    spawnApple();
    
    if (snake[0].x > 480 || snake[0].x < 0 || snake[0].y > 480 || snake[0].y < 0 ){
        gameOver();
        clearInterval(intervalId);
    }
    if (snake[0].x === apple.x && snake[0].y === apple.y){
        apple = {x: Math.floor(Math.random()*34)*15, y: Math.floor(Math.random()*17)*15};
        score += 1;
        ate = true;
        document.getElementById("score").innerHTML = "Score: " + score;
    }

    //Check if head coordinates exist in snake arr
    for(i = 1; i < snake.length; i++){
        if(headX === snake[i].x && headY === snake[i].y){
            gameOver();
            clearInterval(intervalId);
        }
    }
}

function spawnApple(){
    const canvas = document.getElementById("field");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "yellow";
    ctx.fillRect(apple.x+2, apple.y+2, 8, 8);
}



function startGame(){
    document.getElementById("start").style.display = "none";
    document.getElementById("game-over").style.display = "none";

    intervalId = setInterval(move, 200);

    snake = [ 
        {x: 60, y: 0}, //head
        {x: 30, y: 0}, //segment
        {x: 0, y: 0} // tail
    ];
    inputQueue = []
    
    apple = {x: Math.floor(Math.random()*34)*15, y: Math.floor(Math.random()*17)*15};
    
    dir = "right";
    
    score = 0;
    ate = false;

    playing = true;
}

function gameOver(){
    document.getElementById("game-over").style.display = "flex";
    playing = false;
}

document.addEventListener("DOMContentLoaded", () => {
    field.height = 255;
    field.width = 510;
});

document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowRight" || event.key === "d" && inputQueue.length < 3){
        inputQueue.unshift("right");
    }
    if(event.key === "ArrowLeft"  || event.key === "a" && inputQueue.length < 3){
        inputQueue.unshift("left");
    }
    if(event.key === "ArrowUp"  || event.key === "w" && inputQueue.length < 3){
        inputQueue.unshift("up");
    }
    if(event.key === "ArrowDown"  || event.key === "s" && inputQueue.length < 3){
        inputQueue.unshift("down");
    }
});