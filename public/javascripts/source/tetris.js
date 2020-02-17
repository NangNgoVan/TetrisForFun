import Phaser from 'phaser';
import Env from './config/config.js';
import PlayScene from './states/playscene.js';

const Config = {
	type: Phaser.AUTO,
    width: Env['WINDOW_WIDTH'],
    height: Env['WINDOW_HEIGHT'],
    backgroundColor: '#000000',
    scene: null
}

const Tetris = new Phaser.Game(Config);
Tetris.scene.add('PlayScene', PlayScene, false);
Tetris.scene.start('PlayScene');
