
class Paddle {
	constructor(xposStart, yposStart, pwidth, pheight, speed){
		this.xpos = xposStart;
		this.ypos = yposStart;
		this.ygoal = yposStart;
		this.yvel = 0;
		this.width = pwidth;
		this.height = pheight;
		this.speed = speed;
	}

	setYGoal(ygoal){
		this.ygoal = ygoal;	
	}

	update(dt){
		let dy = this.ygoal - this.ypos;	
		if (dy != 0){
			dy *= this.speed / Math.abs(dy);
		}
		this.ypos += dy * dt;
	}	

	render(){
		fill(0,255,0);
		rect(this.xpos, this.ypos, this.width, this.height);
	}
}
