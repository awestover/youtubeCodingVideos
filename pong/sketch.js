
const screenDimensions = [800, 600];
let ball = new Ball([screenDimensions[0]/2, screenDimensions[1]/2]);
const paddleWidth = 15; 
const paddleHeight = 80;
const ballSpeed = 800;
const paddleSpeed = 300;
let paddleLeft = new Paddle(screenDimensions[0]*0.1-paddleWidth*0.5, screenDimensions[1]*0.5-paddleHeight*0.5, paddleWidth, paddleHeight, paddleSpeed);
let paddleRight = new Paddle(screenDimensions[0]*0.9-paddleWidth*0.5, screenDimensions[1]*0.5-paddleHeight*0.5, paddleWidth, paddleHeight, paddleSpeed);

let leftScore = 0;
let rightScore = 0;

let lastTime;
let dt;

function startRound(){
	ball.setPos(screenDimensions[0]/2, screenDimensions[1]/2);
	// let tmpVel = [Math.random()*100, Math.random()*100];
	let tmpVel = [0.8*paddleSpeed, 0.2*paddleSpeed];
	let tmpVelMag = Math.sqrt(tmpVel[0]*tmpVel[0]+tmpVel[1]*tmpVel[1]);
	tmpVel[0] *= ballSpeed/tmpVelMag;
	tmpVel[1] *= ballSpeed/tmpVelMag;
	if(Math.random() < 0.5){
		tmpVel[0] *= -1;
	}
	if(Math.random() < 0.5){
		tmpVel[1] *= -1;
	}
	ball.setVel(tmpVel[0], tmpVel[1]);
}

function setup(){
	createCanvas(screenDimensions[0], screenDimensions[1]);
	startRound();
	textSize(40);
	lastTime = Date.now()/1000;
}

function draw(){

	// update 
	
	dt = Date.now()/1000 - lastTime; 
	lastTime += dt;
	ball.update(dt); // frameRate dependent speed = not good
	paddleLeft.setYGoal(mouseY);
	paddleRight.setYGoal(ball.pos[1]);
	paddleLeft.update(dt);
	paddleRight.update(dt);

	// collisions
	ball.bounceIfCollision(paddleLeft, +1);
	ball.bounceIfCollision(paddleRight, -1);
	ball.topBottomBounce(screenDimensions);
	if(ball.rightLeftDetect(screenDimensions) != "none won"){
		if(ball.rightLeftDetect(screenDimensions) == "left won"){
			leftScore += 1;
			startRound();
		}
		if(ball.rightLeftDetect(screenDimensions) == "right won"){
			rightScore += 1;
			startRound();
		}
	}

	// render
	background(0,0,0);
	fill(0,255,0);
	text(leftScore, screenDimensions[0]*0.2, screenDimensions[1]*0.1);
	text(rightScore, screenDimensions[0]*0.8, screenDimensions[1]*0.1);
	ball.render();
	paddleLeft.render();
	paddleRight.render();

}

