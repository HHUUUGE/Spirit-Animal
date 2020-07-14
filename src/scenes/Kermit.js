/** @type {import ("./typings/phaser")} */

class Kermit extends Phaser.Scene{
    constructor(){
        super("frogScene");
    }

    preload(){
        this.load.image('frog',"./assets/step4.jpg")
        this.load.image('swamp', "./assets/swamp.png")
        this.load.image('floor','./assets/checkerboard.png')

    }

    create(){
        this.physics.world.gravity.y = 250;
        this.swamp = this.add.tileSprite(0,0,640,480,'swamp').setOrigin(0);

        this.ground = this.physics.add.staticGroup();
        this.ground.create(160, 430,'floor').setScale(1.5,.5).refreshBody();
        this.ground.create(600,150,'floor' ).setScale(1.7,.25).refreshBody();

        this.player = new Frog(this, game.config.width/2,200, 'frog').setScale(.25);
        this.physics.world.enable(this.player);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player,this.ground, ()=>{
            this.player.reset();
        }, null, this);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    }

    update(){
        this.player.update();

    }
}



