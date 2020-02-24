import Puzzle from './puzzle.js';

class PuzzleManager {
	constructor() {
		this.currentPuzzle = null;
		this.puzzleNames = ["SquarePuzzle", "LPuzzle", "TPuzzle", "IPuzzle", "SmallSquarePuzzle","NPuzzle"];
		this.t = [[0,0],[1,0],[2,0],[2,1]];;
		this.sq = [[0,0],[0,1],[1,0],[1,1]];
		this.l = [[0,0],[1,0],[2,0],[1,1]];
		this.i = [[0,0],[0,1],[0,2],[0,3]];
		this.smq = [[0,0]];
		this.np = [[0,0],[1,0],[1,1],[2,1]];
	}
	getPuzzle(puzzleName) {
		switch(puzzleName) {
			case "SquarePuzzle" :
				return new Puzzle(this.sq, '0x7B1FA2');
			case "LPuzzle" :
				return new Puzzle(this.l, '0x1565C0');
			case "TPuzzle" :
				return new Puzzle(this.t, '0xCDDC39');
			case "IPuzzle" :
				return new Puzzle(this.i, '0xDD2C00');
			case "SmallSquarePuzzle" :
				return new Puzzle(this.smq, '0x00C853');
			case "NPuzzle":
				return new Puzzle(this.np,'0x00C853');
			default:
				return null;
		}
	}
	getRandomPuzzle()
	{
		var index = Math.floor(Math.random()*6);
		return this.getPuzzle(this.puzzleNames[index]);
	}
}

export default PuzzleManager;