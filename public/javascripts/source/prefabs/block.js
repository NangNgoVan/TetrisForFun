import Phaser from 'phaser';

class Block extends Phaser.Geom.Rectangle{
	constructor(x,y,width,height,color='#fffffff') {
		super(x,y,width,height);
		this.color = color;
	}
}

export default Block;