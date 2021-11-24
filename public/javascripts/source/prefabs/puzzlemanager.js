import Puzzle from './puzzle.js';

class PuzzleManager {
	constructor() {
		this.currentPuzzle = null;
		this.puzzleNames = ["SquarePuzzle", "LPuzzle", "TPuzzle", "IPuzzle", "SmallSquarePuzzle","NPuzzle"];
	}
	getPuzzle(puzzleName) {
		switch(puzzleName) {
			case "SquarePuzzle" :
				return new Puzzle({ body: [[0,0],[0,1],[1,0],[1,1]], center:[0,0], color:'0x7B1FA2'});
			case "LPuzzle" :
				return new Puzzle({ body: [[0,0],[1,0],[2,0],[1,1]], center:[1,0],color: '0x1565C0'});
			case "TPuzzle" :
				return new Puzzle({ body: [[0,0],[1,0],[2,0],[2,1]], center:[0,0],color:'0xCDDC39'});
			case "IPuzzle" :
				return new Puzzle({ body: [[0,0],[0,1],[0,2],[0,3]], center:[0,1],color:'0xDD2C00'});
			case "SmallSquarePuzzle" :
				return new Puzzle({ body: [[0,0]], center:[0,0], color: '0x00C853'});
			case "NPuzzle":
				return new Puzzle({ body: [[0,0],[1,0],[1,1],[2,1]], center:[1,0], color: '0x00C853'});
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