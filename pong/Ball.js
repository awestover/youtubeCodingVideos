class Ball {
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

	render(){
		fill(0,0,255);
		ellipse(this.pos[0], this.pos[1], this.r*2, this.r*2);
	}

	update(dt){
		this.pos[0] += this.vel[0]*dt;
		this.pos[1] += this.vel[1]*dt;
	}

	bounceIfCollision(paddle, sgn){
		if(this.pos[0] - this.r < paddle.xpos + paddle.width && this.pos[0] + this.r > paddle.xpos){
			if(this.pos[1] - this.r < paddle.ypos + paddle.height && this.pos[1] + this.r > paddle.ypos){
				this.vel[0] = sgn*Math.abs(this.vel[0]);
			}
		}
	}

	rightLeftDetect(screenDimensions){
		if(this.pos[0]+this.r > screenDimensions[0]){
			return "left won";
		}
		if(this.pos[0]-this.r < 0){
			return "right won";
		}
		return "none won";
	}

	topBottomBounce(screenDimensions){
		if(this.pos[1]+this.r > screenDimensions[1]){
			this.vel[1] = -Math.abs(this.vel[1]);
		}
		if(this.pos[1]-this.r < 0){
			this.vel[1] = Math.abs(this.vel[1]);
		}
	}
}
