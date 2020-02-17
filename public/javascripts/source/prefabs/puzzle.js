import Block from './block.js';
import Env from './../config/config.js';

class Puzzle {
	constructor(body, color='#ffffff') {
		this.blocks = [];
		this.color=color;

		var xMin = 999999;
		var yMin = 999999;

		var xMax = -999999;
		var yMax = -999999;

		for (var i = 0; i < body.length; i++) {
			var block = new Block(body[i][0]*Env['BLOCK_WIDTH'], 
				body[i][1]*Env['BLOCK_HEIGHT'], 
				Env['BLOCK_WIDTH'], 
				Env['BLOCK_HEIGHT'], 
				color);

			this.blocks.push(block);

			if (body[i][0] < xMin) xMin = body[i][0];
			if (body[i][1] > yMax) yMax = body[i][1];
			if (body[i][0] > xMax) xMax = body[i][0];
			if (body[i][1] < yMin) yMin = body[i][1];
		}

		this.x = xMin;
		this.y = yMin;

		this.width = (xMax - xMin + 1) * Env['BLOCK_WIDTH'];
		this.height = (yMax - yMin + 1) * Env['BLOCK_HEIGHT'];
	}

	move(x,y) {
		var dx = x-this.x;
		var dy = y-this.y;
		this.x = x;
		this.y = y;
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].setPosition(dx+this.blocks[i].x, dy+this.blocks[i].y);
		}
	}
}

export default Puzzle;