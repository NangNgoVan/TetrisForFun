import Phaser from 'phaser';
import Env from './config/config.js';
import PlayScene from './states/playscene.js';

const Config = {
	type: Phaser.AUTO,
    width: Env['WINDOW_WIDTH'],
    height: Env['WINDOW_HEIGHT'],
    backgroundColor: '#E0E0E0',
    scene: null,
    parent: document.getElementById("main")
}

const Tetris = new Phaser.Game(Config);
Tetris.scene.add('PlayScene', PlayScene, false);
Tetris.scene.start('PlayScene');
