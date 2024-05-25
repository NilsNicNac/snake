let snake = [ 
    {x: 60, y: 0}, //head
    {x: 30, y: 0}, //segment
    {x: 0, y: 0} // tail
];

var apple = {x: Math.floor(Math.random()*17)*30, y: Math.floor(Math.random()*17)*30};

var dir = "right";

var score = 0;
var ate = false

function move() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if(dir === "right") {
        headX += 30;
    }
    if(dir === "left") {
        headX -= 30;
    }
    if(dir === "up") {
        headY -= 30;
    }
    if(dir === "down") {
        headY += 30;
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

    ctx.fillRect(snake[0].x, snake[0].y, 25, 25);
    ctx.fillStyle = "orange";
    for(i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i].x,snake[i].y, 25, 25);
    }
    console.log("x:", snake[0].x, "y:", snake[0].y)
    spawnApple();
    
    if (snake[0].x > 480 || snake[0].x < 0 || snake[0].y > 480 || snake[0].y < 0 ){
        alert("Game Over");
    }
    if (snake[0].x === apple.x && snake[0].y === apple.y){
        apple = {x: Math.floor(Math.random()*17)*30, y: Math.floor(Math.random()*17)*30};
        score += 1;
        ate = true;
        document.getElementById("score").innerHTML = "score: " + score;
    }

    //Check if head coordinates exist in snake arr
    for(i = 1; i < snake.length; i++){
        if(headX === snake[i].x && headY === snake[i].y){
            alert("Game Over");
        }
    }

    keystrokeRegistered = false;
}

function spawnApple(){
    const canvas = document.getElementById("field");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "yellow";
    ctx.fillRect(apple.x+5, apple.y+5, 15, 15);
}



function startGame(){
    document.getElementById("start").style.display = "none";
    document.getElementById("score").innerHTML = "score: " + score;
    setInterval(move, 200);
}

document.addEventListener("DOMContentLoaded", () => {
    field.height = 510;
    field.width = 510;
});

document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowRight" || event.key === "d" && dir != "left") {
        if(keystrokeRegistered === false){
            dir = "right";
        }
        keystrokeRegistered = true;
    }
    if(event.key === "ArrowLeft"  || event.key === "a"  && dir != "right") {
        if(keystrokeRegistered === false){
            dir = "left";
        }
        keystrokeRegistered = true;
    }
    if(event.key === "ArrowUp"  || event.key === "w"  && dir != "down") {
        if(keystrokeRegistered === false){
            dir = "up";
        }
        keystrokeRegistered = true;
    }
    if(event.key === "ArrowDown"  || event.key === "s" && dir != "up") {
        if(keystrokeRegistered === false){
            dir = "down";
        }
        keystrokeRegistered = true;
    }
});