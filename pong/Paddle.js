class Paddle {
	constructor(startX, startY, width, height, yspeed){
		this.xpos = startX;
		this.ypos = startY;
		this.ygoal = startY;
		this.yvel = 0; 
		this.width = width;
		this.height = height;
		this.yspeed = yspeed;
	}

	render(){
		fill(255,0,0);
		rect(this.xpos, this.ypos, this.width, this.height);
	}

	setYGoal(ygoal){
		this.ygoal = ygoal;
	}


	update(dt){
		let dy = this.ygoal - this.ypos;
		if(dy != 0){
			dy *= this.yspeed/Math.abs(dy);
			this.ypos += dy*dt;
		}
	}
}
