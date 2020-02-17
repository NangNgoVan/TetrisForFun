import Puzzle from './puzzle.js';

class LPuzzle extends Puzzle {
	constructor(color='#ffffff') {
		var body = [[0,0],[1,0],[2,0],[2,1]];
		super(body, color);
	}
}

class SquarePuzzle extends Puzzle {
	constructor(color='#ffffff') {
		var body = [[0,0],[0,1],[1,0],[1,1]];
		super(body, color);
	}
}

class TPuzzle extends Puzzle {
	constructor(color = '#ffffff') {
		var body = [[0,0],[1,0],[2,0],[1,1]];
		super(body, color);
	}
}

class IPuzzle extends Puzzle {
	constructor(color='#ffffff') {
		var body = [[0,0],[0,1],[0,2],[0,3]];
		super(body, color);
	}
}

class SmallSquarePuzzle extends Puzzle {
	constructor(color='#ffffff') {
		var body = [[0,0]];
		super(body, color);
	}
}

class PuzzleManager {
	constructor() {
		this.currentPuzzle = null;
		this.puzzleNames = ["SquarePuzzle", "LPuzzle", "TPuzzle", "IPuzzle", "SmallSquarePuzzle"];
	}
	getPuzzle(puzzleName) {
		switch(puzzleName) {
			case "SquarePuzzle" :
				return new SquarePuzzle('0xffcc00');
			case "LPuzzle" :
				return new LPuzzle('0xff1a1a');
			case "TPuzzle" :
				return new TPuzzle('0x006600');
			case "IPuzzle" :
				return new IPuzzle('0x8c1aff');
			case "SmallSquarePuzzle" :
				return new SmallSquarePuzzle('0xb300b3');
			default:
				return null;
		}
	}
	getRandomPuzzle()
	{
		var index = Math.floor(Math.random()*4);
		return this.getPuzzle(this.puzzleNames[index]);
	}
}

export default PuzzleManager;