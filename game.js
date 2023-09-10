const canvas = document.getElementById("gameWindow");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown",changeDirection);
document.getElementById("resetBtn").onclick = () => {
		gameBegin();
}

function gameBegin(){
	snake = [
	{x:2*unitSize,y:0},
	{x:unitSize,y:0},
	{x:0,y:0}
	]
	xVelocity = unitSize;
	yVelocity = 0;
	score = 0;
	document.getElementById("score").innerHTML = "Score: " + score;
	gameOverText.style.display="none";
	foodGen();
	frameID = setInterval(gameLoop,100);
}
//unitSize of our snake game
let gameOverText = document.getElementById("gameOverText");
const unitSize = 20;
let snake = [
	{x:2*unitSize,y:0},
	{x:unitSize,y:0},
	{x:0,y:0}
	]
let xVelocity=unitSize;
let yVelocity=0;
let xFood ;
let yFood ;
let score = 0;

function drawSquare(x,y,color){
	ctx.fillStyle=color;
	ctx.fillRect(x,y,20,20);
	ctx.strokeStyle = "black";
	ctx.lineWidth= 2;
	ctx.strokeRect(x,y,20,20);
	return {x,y}
}

//function to draw each snake part
function drawSnake(){
	snake.forEach((snakePart)=>{
		drawSquare(snakePart.x,snakePart.y,"green");
	});
}

	
//logic to move the snake : head lead, tail trail approach
function moveSnake(){
	//snakeHead object takes x and y values from first element of snake array
	snakeHead = { x : snake[0].x, y : snake[0].y };
	//making changes in position of snakeHead
	snakeHead.x += xVelocity;
	snakeHead.y += yVelocity;
	//drawing the snakeHead with each game tick with added velocity

	drawSquare(snakeHead.x,snakeHead.y,"green");
	//we will now add the snakeHead to front of the snake array
	snake.unshift(snakeHead);
	//pop the last element of snake array , i.e. the tail
	snake.pop();
}

//function that clears the canvas
function clearWindow(){
	ctx.clearRect(0,0,500,500);
}

function foodGen(){
	let randx = Math.floor(Math.random()*20);
	let randy = Math.floor(Math.random()*20);
	xFood = randx * unitSize;
	yFood = randy * unitSize;
}
foodGen();
function mapFood(){
	drawSquare(xFood,yFood,"red")
}

function checkFoodEat(){

	if(snakeHead.x == xFood && snakeHead.y == yFood){
		snakeHead = { x : xFood, y : yFood};
		snake.unshift(snakeHead);
		drawSquare(snakeHead.x , snakeHead.y , "green");
		scoreIncrement();
		foodGen();
 
 	}
	else{

	}
}


// setInterval(function consoleSnakeArray(){
// 	snake.forEach((snakePart)=>{
// 		console.log(snakePart.x,snakePart.y)
// 	})
// },2000);

function changeDirection(event){
	switch(event.key){
		case "ArrowUp":
			if(!yVelocity){
				yVelocity = -unitSize;
			}
			xVelocity=0;
			break;
		case "ArrowDown":
			if(!yVelocity){
				yVelocity = unitSize;
			}
			xVelocity=0;
			break;
		case "ArrowRight":
			if(!xVelocity){
				xVelocity = unitSize;
			}
			yVelocity=0;
			break;
		case "ArrowLeft":
			if(!xVelocity){
				xVelocity = -unitSize;
			}
			yVelocity=0;
			break;
	}

}

function gameOver(){
	gameOverText.style.display="block";
	clearInterval(frameID);
}


function checkWall(){
	if(snakeHead.x + unitSize> 400 || snakeHead.x < 0 ){
		gameOver();
	} else if(snakeHead.y + unitSize> 400 || snakeHead.y <0){
		gameOver();
	}
}

function scoreIncrement(){
	score += 1;
	console.log(typeof(score),score);
	document.getElementById("score").innerHTML = "Score: " + score;
}
function checkOwnBody(){
	for(let i = 1 ; i < snake.length ; i++){
		if(snakeHead.x == snake[i].x && snakeHead.y == snake[i].y){
			gameOver();
		}
	}
}
function gameLoop(){
	clearWindow();
	mapFood();
	drawSnake();
	moveSnake();
	checkWall();
	checkOwnBody();
	checkFoodEat();
}

gameBegin();

//frameID = setInterval(gameLoop,100)
