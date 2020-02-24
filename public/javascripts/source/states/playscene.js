import Phaser from 'phaser';
import Env from './../config/config.js';
import PuzzleManager from './../prefabs/puzzlemanager.js';

class PlayScene extends Phaser.Scene {
	constructor(config) {
		super(config);
		
		this.blockArrWidth = Env['WINDOW_WIDTH'] / Env['BLOCK_WIDTH'];
		this.blockArrHeight = Env['WINDOW_HEIGHT'] / Env['BLOCK_HEIGHT'];
		
		this.state = new Array(this.blockArrHeight);
		
		for (var i = 0; i < this.state.length; i++) {
			this.state[i] = new Array(this.blockArrWidth).fill(null);
		};

		this.blockNumInRow = new Array(this.blockArrHeight).fill(0);
	}

	init(data) {

	}

	preload() {

	}

	create() {
        this.graphics = this.add.graphics();
        this.puzzleManager = new PuzzleManager();
        this.puzzle = null;

        this.keyD = this.input.keyboard.addKey('D');
        this.keyA = this.input.keyboard.addKey('A');
        this.keyS = this.input.keyboard.addKey('S');

        this.step = Env['BLOCK_HEIGHT'];

        this.keyAPressed = false;
        this.keyDPressed = false;
        this.keySPressed = false;

        this.timer = 0;
	}

	update(time, data) {
		if (this.puzzle == null) {
			this.puzzle = this.puzzleManager.getRandomPuzzle();
			//this.puzzle = this.puzzleManager.getPuzzle('NPuzzle');
			if(this.collision('down')) {
				this.puzzle = null;
				//console.log('end game.');
				return;
			}
		}

		this.puzzle.rotate90Degree();

		if (this.timer == Env['TIME_TICKER']) {
			this.puzzle.move(this.puzzle.x, this.puzzle.y+1);
			this.timer = 0;
		}
		else this.timer++;

		if (!this.keyDPressed) {
			if (this.keyD.isDown) {
				if (this.puzzle != null) {
					if (!this.collision('right')) {
						this.puzzle.move(this.puzzle.x+this.step, this.puzzle.y);
					}
				}
			}
			this.keyDPressed = true;
		}

		if (!this.keyAPressed) {
			if (this.keyA.isDown) {
				if (this.puzzle != null) {
					if (!this.collision('left')) {
						this.puzzle.move(this.puzzle.x-this.step, this.puzzle.y);
					}
				}
			}
			this.keyAPressed = true;
		}

		if (this.keyA.isUp) this.keyAPressed = false;
		if (this.keyD.isUp) this.keyDPressed = false;

		if (this.collision('down')) {
			this.updateState();
			this.puzzle=null;
		}

		this.graphics.clear();
		this.drawState();
		if (this.puzzle != null)
			this.drawPuzzle(this.puzzle);
	}

	updateState() {
		var block;
		var x;
		var y;
		for (var i = 0; i < this.puzzle.blocks.length; i++) {
			block = this.puzzle.blocks[i];
			x = block.x/Env['BLOCK_WIDTH'];
			y = block.y/Env['BLOCK_HEIGHT'];
			this.state[y][x] = block;
			this.blockNumInRow[y]+=1;
			if (this.blockNumInRow[y] == this.blockArrWidth) {
				this.state.splice(y, 1);
				this.blockNumInRow.splice(y,1);
				this.state.unshift(new Array(this.blockArrHeight).fill(null));
				this.blockNumInRow.unshift(0);
			}
		}
	}

	drawPuzzle(puzzle) {
		for (var i = 0; i < puzzle.blocks.length; i++) {
			let block = new Phaser.Geom.Rectangle(
				puzzle.blocks[i].x,
				puzzle.blocks[i].y, 
				puzzle.blocks[i].width, 
				puzzle.blocks[i].height);
			
			this.drawBlock(block,puzzle.blocks[i].color);
		}
	}

	drawState() {
		for (var i = 0; i < this.state.length; i++) {
			for (var j = 0; j < this.state[i].length; j++) {
				if (this.state[i][j] != null) {
					let block = new Phaser.Geom.Rectangle(
						j*this.state[i][j].width,
						i*this.state[i][j].height,
						this.state[i][j].width,
						this.state[i][j].height
					);
					this.drawBlock(block, this.state[i][j].color);
				}
				else {
					let gridBlock = new Phaser.Geom.Rectangle(
						j*Env['BLOCK_WIDTH'],
						i*Env['BLOCK_HEIGHT'],
						Env['BLOCK_WIDTH'],
						Env['BLOCK_HEIGHT']
					);
					this.drawBlock(gridBlock, '0xffffff');
				}
			}
		}
	}

	drawBlock(block,color) {
		this.graphics.fillStyle(color, 0.8);
		this.graphics.fillRect(
			block.x+1,
			block.y+1,
		    block.width-1,
			block.height-1);
	}

	collision(direction) {
		switch (direction) {
			case 'down':
				if (this.puzzle.y == Env['WINDOW_HEIGHT']-this.puzzle.height) return true;
				for (let i = 0; i < this.puzzle.blocks.length; i++) {
					if (this.puzzle.blocks[i].y % Env['BLOCK_HEIGHT'] == 0) {
						let x = this.puzzle.blocks[i].x / Env['BLOCK_WIDTH'];
						let y = this.puzzle.blocks[i].y / Env['BLOCK_HEIGHT'];
						if (this.state[y] != undefined && this.state[y+1][x] != null) return true;
					}
				}
				break;
			case 'right':
				if (this.puzzle.x == Env['WINDOW_WIDTH']-this.puzzle.width) return true;
				for (let i = 0; i < this.puzzle.blocks.length; i++) {
					let x = this.puzzle.blocks[i].x / Env['BLOCK_WIDTH'];
					let y = Math.ceil(this.puzzle.blocks[i].y / Env['BLOCK_HEIGHT']);
					if (this.state[y] != undefined && this.state[y][x+1] != null) return true;
				}
				break;
			case 'left':
				if (this.puzzle.x == 0) return true;
				for (let i = 0; i < this.puzzle.blocks.length; i++) {
					let x = this.puzzle.blocks[i].x / Env['BLOCK_WIDTH'];
					let y = Math.ceil(this.puzzle.blocks[i].y / Env['BLOCK_HEIGHT']);
					if (this.state[y] != undefined && this.state[y][x-1] != null) return true;
				}
				break;
			case 'up':
				break;
			default:
				return false;
		}
	}
}

export default PlayScene;