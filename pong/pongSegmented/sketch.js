
const screenDimensions = [800, 600];
const PADDLE_WIDTH = 30;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 100;

let ball = new Ball([screenDimensions[0]/2, screenDimensions[1]/2]);
let leftPaddle = new Paddle(screenDimensions[0]*0.1-PADDLE_WIDTH*0.5, screenDimensions[1]/2-PADDLE_HEIGHT/2,PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_SPEED);
let rightPaddle = new Paddle(screenDimensions[0]*0.9-PADDLE_WIDTH*0.5,screenDimensions[1]/2-PADDLE_HEIGHT/2,PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_SPEED);

let leftScore = 0;
let rightScore = 0;

let dt;
let lastTime;

function startRound(){
	ball.setPos(screenDimensions[0]/2, screenDimensions[1]/2);
	let tmpVel = [300, 50];
	if(Math.random()<0.5){
		tmpVel[0] *= -1;
	}
	if(Math.random()<0.5){
		tmpVel[1] *= -1;
	}
	ball.setVel(tmpVel[0], tmpVel[1]);
}

function setup(){
	createCanvas(screenDimensions[0], screenDimensions[1]);
	textSize(40);
	lastTime = Date.now()/1000;
	startRound();
}

function draw(){
	// render
	background(0,0,0);
	fill(0,0,255);
	text(leftScore, screenDimensions[0]*0.2, screenDimensions[1]*0.1);
	text(rightScore, screenDimensions[0]*0.8, screenDimensions[1]*0.1);
	ball.render();
	leftPaddle.render();
	rightPaddle.render();

	// update
	dt = Date.now()/1000 - lastTime;
	lastTime += dt;

	leftPaddle.setYGoal(mouseY);
	rightPaddle.setYGoal(ball.pos[1]);
	leftPaddle.update(dt);
	rightPaddle.update(dt);

	ball.update(dt);

	// collision detection
	ball.bounceTopBottom(screenDimensions);
	if(ball.checkRoundOver(screenDimensions) != "none won"){
		if(ball.checkRoundOver(screenDimensions) == "left won"){
			leftScore += 1;
			startRound();
		}
		if(ball.checkRoundOver(screenDimensions) == "right won"){
			rightScore += 1;
			startRound();
		}
	}

	ball.hitPaddle(leftPaddle, +1);
	ball.hitPaddle(rightPaddle, -1);
}
