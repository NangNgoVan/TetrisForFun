import Puzzle from './puzzle.js';

class LPuzzle extends Puzzle {
	constructor(color='#ffffff') {
		var body = [[0,0],[1,0],[2,0],[2,1]];
		super(body, color);
	}
}

export default LPuzzle;