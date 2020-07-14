/** @type {import ("../../typings/phaser")} */

class Tweety extends Phaser.Scene{
    constructor(){
        super("birdScene");
    }

    preload(){
        
        //temp bird image from http://clipart-library.com/clipart/8cEb9bjXi.htm
        this.load.image('bird',"./assets/Bird.png")
        this.load.image('swamp', "./assets/swamp.png")
        this.load.image('floor','./assets/checkerboard.png')
        
        //wingflap from Adam_N's freesound account @https://freesound.org/people/Adam_N/sounds/330967/
        //Used under the creative commons 0 Liecense
        //it's temporary anyway.
        this.load.audio('flap', './assets/wingflap.wav')

    }

    create(){

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        //set backgound
        this.swamp = this.add.tileSprite(0,0,640,480,'swamp').setOrigin(0);


        //create immovable platforms for ground
        this.ground = this.physics.add.staticGroup();
        this.ground.create(160, 430,'floor').setScale(1.5,.5).refreshBody();
        this.ground.create(600,150,'floor' ).setScale(1.7,.25).refreshBody();


        //create player character using frog instance
        this.player = new Bird(this, game.config.width/2,200, 'bird').setScale(.1);
        
        //enable physics for sprite
        this.physics.world.enable(this.player);
        
        //set bounce and worldBound collision
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //set platform collision, reset inAir trigger on collision
        this.physics.add.collider(this.player,this.ground);


        //key inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.add.text(0,0, "Tweety",menuConfig).setOrigin(0);

    }
    update(){
        this.player.update();

        

    }
}