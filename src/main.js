/** @type {import ("./typings/phaser")} */

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade:{
            debug: true
        }
    },
    scene: [Kermit]
}

let game = new Phaser.Game(config);


//keyboard bindings
let keySPACE, keyLEFT, keyRIGHT;