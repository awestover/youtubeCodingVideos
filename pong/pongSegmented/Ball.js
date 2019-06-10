class Ball{
	constructor(initPos){
		this.pos = initPos;
		this.vel = [0, 0];
		this.r = 10;
	}

	setPos(xpos, ypos){
		this.pos[0] = xpos;
		this.pos[1] = ypos;
	}

	setVel(xvel, yvel){
		this.vel[0] = xvel;
		this.vel[1] = yvel;
	}

	update(dt) {
		this.pos[0] += this.vel[0] * dt;
		this.pos[1] += this.vel[1] * dt;
	}

	bounceTopBottom(screenDimensions){
		if(this.pos[1]-this.r < 0){
			this.vel[1] = Math.abs(this.vel[1]);
		}
		else if(this.pos[1]+this.r > screenDimensions[1]){
			this.vel[1] = -Math.abs(this.vel[1]);
		}
	}

	checkRoundOver(screenDimensions){
		if(this.pos[0]-this.r < 0){
			return "right won";
		}
		else if(this.pos[0]+this.r > screenDimensions[0]){
			return "left won"
		}
		return "none won";
	}

	hitPaddle(paddle, sgn){
		let xIn = (this.pos[0]-this.r < paddle.xpos + paddle.width) && (this.pos[0]+this.r > paddle.xpos);
		let yIn = (this.pos[1]-this.r < paddle.ypos + paddle.height) && (this.pos[1]+this.r > paddle.ypos);
		if(xIn && yIn){
			this.vel[0] = sgn*Math.abs(this.vel[0]);	
		}
	}

	render(){
		fill(255,0,0);
		ellipse(this.pos[0], this.pos[1], this.r*2, this.r*2);
	}
}
