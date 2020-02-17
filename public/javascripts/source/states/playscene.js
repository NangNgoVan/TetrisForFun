import Phaser from 'phaser';
import Env from './../config/config.js';
import PuzzleManager from './../prefabs/puzzlemanager.js';

class PlayScene extends Phaser.Scene {
	constructor(config) {
		super(config);
		
		var blockArrWidth = Env['WINDOW_WIDTH'] / Env['BLOCK_WIDTH'];
		var blockArrHeight = Env['WINDOW_HEIGHT'] / Env['BLOCK_HEIGHT'];
		
		this.state = new Array(blockArrHeight);
		
		for (var i = 0; i < this.state.length; i++) {
			this.state[i] = new Array(blockArrWidth).fill(null);
		};

		console.log(this.state);
	}

	init(data) {

	}

	preload() {

	}

	create() {
        this.graphics = this.add.graphics();
        this.puzzleManager = new PuzzleManager();
        this.currentPuzzle = null;

        this.keyD = this.input.keyboard.addKey('D');
        this.keyA = this.input.keyboard.addKey('A');
        this.keyS = this.input.keyboard.addKey('S');

        this.step = Env['BLOCK_WIDTH'];

        this.keyAPressed = false;
        this.keyDPressed = false;
	}

	update(time, data) {
		this.graphics.clear();

		if (this.currentPuzzle == null) {
			this.currentPuzzle = this.puzzleManager.getRandomPuzzle();
		}

		if (this.keyA.isDown) {
			if (!this.keyAPressed) {
				if(this.checkAreaInFrame(this.currentPuzzle.x-this.step, this.currentPuzzle.y, this.currentPuzzle.width, this.currentPuzzle.height))
				this.currentPuzzle.move(this.currentPuzzle.x-this.step, this.currentPuzzle.y);
				this.keyAPressed = true;
			}
		}
		
		if (this.keyD.isDown) {
			if (!this.keyDPressed) {
				if(this.checkAreaInFrame(this.currentPuzzle.x+this.step, this.currentPuzzle.y, this.currentPuzzle.width, this.currentPuzzle.height))
					this.currentPuzzle.move(this.currentPuzzle.x+this.step, this.currentPuzzle.y);
				this.keyDPressed = true;
			}
			
		}
		
		if (this.keyS.isDown) {
			while(this.checkAreaInFrame(this.currentPuzzle.x, this.currentPuzzle.y+this.step, this.currentPuzzle.width, this.currentPuzzle.height))
				this.currentPuzzle.move(this.currentPuzzle.x, this.currentPuzzle.y+this.step);
		}

		if (this.keyA.isUp) {
			this.keyAPressed = false;
		}

		if (this.keyD.isUp) {
			this.keyDPressed = false;
		}

		if (this.checkAreaInFrame(this.currentPuzzle.x, this.currentPuzzle.y+1, this.currentPuzzle.width, this.currentPuzzle.height))
		{
			this.currentPuzzle.move(this.currentPuzzle.x, this.currentPuzzle.y+1);
			this.drawPuzzle(this.currentPuzzle);
		}
		else {
			for (var i = 0; i < this.currentPuzzle.blocks.length; i++) {
				this.state[this.currentPuzzle.blocks[i].x/20][this.currentPuzzle.blocks[i].y/20] = this.currentPuzzle.blocks[i];
			}
			this.currentPuzzle = null;	
		}
		this.drawState();
	}

	drawPuzzle(puzzle) {
		for (var i = 0; i < puzzle.blocks.length; i++) {
			this.graphics.fillStyle(this.currentPuzzle.color, 1);
			this.graphics.fillRectShape(puzzle.blocks[i]);
		}
	}

	drawState()
	{
		for (var i = 0; i < this.state.length; i++) {
			for (var j = 0; j < this.state[i].length; j++) {
				if (this.state[i][j] != null) {
					this.graphics.fillStyle(this.state[i][j].color, 1);
					this.graphics.fillRectShape(this.state[i][j]);
				}
			}
		}
	}

	checkAreaInFrame(x,y,width,height) {
		if (x <= Env['WINDOW_WIDTH']-width
			&& x >= 0
			&& y <= Env['WINDOW_HEIGHT']-height
			&& y >= 0)
			return true;
		return false;
	}
}

export default PlayScene;