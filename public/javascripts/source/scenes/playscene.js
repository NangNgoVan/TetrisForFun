import Phaser from 'phaser';
import Env from '../config/config.js';
import PuzzleManager from '../prefabs/puzzlemanager.js';

class PlayScene extends Phaser.Scene {
	constructor(config) {
		super(config);
		this.key = "PlayGame";
		
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
		this.load.audio('backgroundSound', '/sounds/Tetris.ogg');
		this.load.audio('line', '/sounds/selection.wav');
		this.load.audio('fall', '/sounds/fall.wav');
		this.load.audio('selection', '/sounds/selection.wav');
	}

	create() {
        this.graphics = this.add.graphics();
        this.puzzleManager = new PuzzleManager();
        this.puzzle = null;

		this.keys = this.input.keyboard.addKeys({up: 'up', down:'down', left: 'left', right:'right'});

        this.step = Env['BLOCK_HEIGHT'];

		this.timer = 0;
		
		//audio
		this.gameSound = this.sound.add('backgroundSound',{loop:true});
		//this.gameSound.play();
		this.lineSound = this.sound.add('line');
		this.fallSound = this.sound.add('fall');
		this.selectionSound = this.sound.add('selection');
	}

	update(time, data) {
		if (this.puzzle == null) {
			this.puzzle = this.puzzleManager.getRandomPuzzle();
			if(this.collision('down')) {
				this.puzzle = null;
				this.scene.start('GameOver');
				this.gameSound.stop();
				return;
			}
		}

		if (this.timer == Env['TIME_TICKER']) {
			this.puzzle.move(this.puzzle.x, this.puzzle.y+1);
			this.timer = 0;
		}
		else this.timer++;

		if (this.input.keyboard.checkDown(this.keys.right,200)) {
			if (this.puzzle != null) {
				if (!this.collision('right')) {
					this.puzzle.move(this.puzzle.x+this.step, this.puzzle.y);
				}
			}
		}

		if (this.input.keyboard.checkDown(this.keys.left,200)) {
			if (this.puzzle != null) {
				if (!this.collision('left')) {
					this.puzzle.move(this.puzzle.x-this.step, this.puzzle.y);
				}
			}
		}

		if (this.input.keyboard.checkDown(this.keys.up,200)) {
			this.puzzle = this.puzzle.rotate();
			this.selectionSound.play();
		}

		if (this.collision('down')) {
			this.updateState();
			this.fallSound.play();
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
			console.log(x,y);
			this.state[y][x] = block;
			this.blockNumInRow[y]+=1;
			
		}
		for (var i = 0; i < this.blockNumInRow.length; i++) {
			if (this.blockNumInRow[i] == this.blockArrWidth) {
				this.state.splice(i, 1);
				this.blockNumInRow.splice(i,1);
				this.state.unshift(new Array(this.blockArrHeight).fill(null));
				this.blockNumInRow.unshift(0);
				this.lineSound.play();
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
			
			this.drawBlock(block,puzzle.blocks[i].color, 0.8);
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
					this.drawBlock(block, this.state[i][j].color, 0.8);
				}
				else {
					let gridBlock = new Phaser.Geom.Rectangle(
						j*Env['BLOCK_WIDTH'],
						i*Env['BLOCK_HEIGHT'],
						Env['BLOCK_WIDTH'],
						Env['BLOCK_HEIGHT']
					);
					this.drawBlock(gridBlock, '0xffffff', 0.4);
				}
			}
		}
	}

	drawBlock(block,color, alpha = 1) {
		this.graphics.fillStyle(color, alpha);
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
						if (this.state[y+1] != undefined && this.state[y+1][x] != null) return true;
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