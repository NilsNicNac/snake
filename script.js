
//config
fieldWidth = 1600;
fieldHeight = 800;  //fieldHeight AND fieldWidth MUST BE MULTIPLE OF tileSize!!
tileSize = 40;
fps = 5;            //controls speed

widthByTile = fieldWidth/tileSize;
heightByTile = fieldHeight/tileSize;

let snake = [ 
    {x: 2, y: 0},  //head
    {x: 1, y: 0},  //segment
    {x: 0, y: 0}    //tail
];

//inputQueue to allow multiple inputs before next frame has rendered. Can't be more than two elements.
let inputQueue = [];

var apple = {
    x: Math.floor(Math.random()*widthByTile), 
    y: Math.floor(Math.random()*heightByTile)
};

var dir = "right";

var score = 0;
var ate = false;

function move() {
    console.log(inputQueue.length)

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
        headX += 1;
    }
    if(dir === "left") {
        headX -= 1;
    }
    if(dir === "up") {
        headY -= 1;
    }
    if(dir === "down") {
        headY += 1;
    }

    snake.unshift({x: headX, y: headY});


    if(!ate){
        snake.pop();
    }
    ate = false;

    for(i = 1; i < snake.length; i++){
        if(headX === snake[i].x && headY === snake[i].y){
            gameOver();
            clearInterval(intervalId);
            return;
        }
    }
    
    if (snake[0].x >= widthByTile || snake[0].x < 0 || snake[0].y >= heightByTile || snake[0].y < 0 ){
        gameOver();
        clearInterval(intervalId);
        return;
    }

    const canvas = document.getElementById("field");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(snake[0].x * tileSize - 5, snake[0].y * tileSize - 5, 45, 45);
    for(i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, 35, 35);
    }
    
    if (snake[0].x === apple.x && snake[0].y === apple.y){
        apple = {x: Math.floor(Math.random()*widthByTile), y: Math.floor(Math.random()*heightByTile)};
        score += 1;
        ate = true;
        document.getElementById("score").innerHTML = "Score: " + score;
    }

    spawnApple();
}

function spawnApple(){
    const canvas = document.getElementById("field");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "yellow";
    ctx.fillRect(apple.x*tileSize + 7, apple.y*tileSize + 7, tileSize-15, tileSize-15); 

}

function startGame(){
    document.getElementById("start").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("score").innerHTML = "Score: 0";

    intervalId = setInterval(move, Math.round((1/fps)*1000));

    snake = [ 
        {x: 2, y: 0}, //head
        {x: 1, y: 0}, //segment
        {x: 0, y: 0} // tail
    ];
    inputQueue = []
   
    apple = {x: Math.floor(Math.random() * widthByTile), y: Math.floor(Math.random() * heightByTile)};
    
    dir = "right";
    
    score = 0;
    ate = false;

}

function gameOver(){
    document.getElementById("game-over").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
    field.height = fieldHeight;
    field.width = fieldWidth;
});

document.addEventListener("keydown", (event) => {
    if((event.key === "ArrowRight" || event.key === "d") && (inputQueue.length < 3)){
        inputQueue.unshift("right");
    }
    if((event.key === "ArrowLeft"  || event.key === "a") && (inputQueue.length < 3)){
        inputQueue.unshift("left");
    }
    if((event.key === "ArrowUp"  || event.key === "w") && (inputQueue.length < 3)){
        inputQueue.unshift("up");
    }
    if((event.key === "ArrowDown"  || event.key === "s") && (inputQueue.length < 3)){
        inputQueue.unshift("down");
    }
});