import Block from './block.js';
import Env from './../config/config.js';

class Puzzle {
	constructor(config) {
		if (config.angle) this.angle = config.angle
		else this.angle = 0;
		if (config.center) this.center = config.center;
		if (config.body) this.body = config.body;
		if (config.color) this.color = config.color
		else this.color = '#ffffff';

		if (config.position) {
			this.x = config.position.x;
			this.y = config.position.y;
		}

		this.blocks = [];
		this.create (this.body, this.center, this.angle);
	}
	
	create(body, center, angle) {
		var xMax,yMax,xMin,yMin;
		xMax = yMax = Number.MIN_VALUE;
		xMin = yMin = Number.MAX_VALUE;

		for (var i = 0; i < body.length; i++) {
			let x = body[i][0]*Env['BLOCK_WIDTH'];
			let y = body[i][1]*Env['BLOCK_HEIGHT'];
			
			var rotateBlock = this.rotateBlock([x,y],center,angle);
			x = rotateBlock[0];
			y = rotateBlock[1];

			var block = new Block(
				x, 
				y,
				Env['BLOCK_WIDTH'], 
				Env['BLOCK_HEIGHT'], 
				this.color);

			this.blocks.push(block);

			if (block.x < xMin) xMin = block.x;
			if (block.y > yMax) yMax = block.y;
			if (block.x > xMax) xMax = block.x;
			if (block.y < yMin) yMin = block.y;
		}

		if (!this.x)
			this.x = xMin;
		if (!this.y)
			this.y = yMin;

		this.width = xMax - xMin + Env['BLOCK_WIDTH'];
		this.height = yMax - yMin + Env['BLOCK_HEIGHT'];
	}

	move(x,y) {
		var dx = x-this.x;
		var dy = y-this.y;
		this.x = x;
		this.y = y;
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].x = dx+this.blocks[i].x;
			this.blocks[i].y = dy+this.blocks[i].y;
		}
	}

	rotate() {
		//var newAngle = (this.angle+90)%360;
		// var obj = new Puzzle({
		// 	body: this.body, 
		// 	center:this.center, 
		// 	color:this.color, 
		// 	angle:newAngle, 
		// 	position: {x: this.x, y: this.y}
		// });
		return this;
	}

	rotateBlock(block,center,angle) {
		let a = Math.abs(block[0]-center[0]);
		let b = Math.abs(block[1]-center[1]);
		switch (angle) {
			case 0:
				return block;
			case 90:
				return [center[0]-a,center[1]+b];
			case 180:
				return [2*center[0]-block[0], 2*center[1]-block[1]];
			case 270:
				return [center[0]+a, center[1]-b];
			default:
				return null;
		}
	}
}

export default Puzzle;