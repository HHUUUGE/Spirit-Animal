/** @type {import ("./typings/phaser")} */

/**
 * Group 6:
 * Sean Carpenter
 * Ariana Lazich
 * Drew Parker
 * Ashwin Gupta
 */



let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',

    },
    scene: [Intro,Kermit,End]
}

let game = new Phaser.Game(config);


//keyboard bindings
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN;