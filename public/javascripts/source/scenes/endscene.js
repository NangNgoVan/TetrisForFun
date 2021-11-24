import Phaser from 'phaser';

class EndScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.key = "GameOver";
    }

    init (data) {

    }

    preload() {
        this.load.audio('endSound', '/sounds/gameover.wav');
    }

    create() {
        this.endSound = this.sound.add('endSound');
        this.endSound.play();
    }
}
export default EndScene;