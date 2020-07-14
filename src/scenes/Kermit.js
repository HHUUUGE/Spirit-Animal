/** @type {import ("../../typings/phaser")} */

class Kermit extends Phaser.Scene{
    constructor(){
        super("frogScene");
    }

    preload(){
        //temp frog sprite borrowed from internet
        this.load.image('frog',"./assets/step4.jpg")
        this.load.image('swamp', "./assets/swamp.png")
        this.load.image('floor','./assets/checkerboard.png')
        
        //Jumping from Leszek_Szary's freesound account @https://freesound.org/people/Leszek_Szary/sounds/172205/
        //Used under the creative commons 0 Liecense
        //it's temporary anyway.
        this.load.audio('jump', './assets/jumping.wav')

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

        //set scene gravity
        this.physics.world.gravity.y = 250;
        
        //set backgound
        this.swamp = this.add.tileSprite(0,0,640,480,'swamp').setOrigin(0);


        //create immovable platforms for ground
        this.ground = this.physics.add.staticGroup();
        this.ground.create(160, 430,'floor').setScale(1.5,.5).refreshBody();
        this.ground.create(600,150,'floor' ).setScale(1.7,.25).refreshBody();


        //create player character using frog instance
        this.player = new Frog(this, game.config.width/2,200, 'frog').setScale(.25);
        
        //enable physics for sprite
        this.physics.world.enable(this.player);
        
        //set bounce and worldBound collision
        this.player.setBounce(0.2);
        this.player.body.onCollide=true;
        this.player.body.onWorldBounds=true;
        this.player.setCollideWorldBounds(true);

        //set platform collision, reset inAir trigger on collision
        this.physics.add.collider(this.player,this.ground, ()=>{
            this.player.reset();
        }, null, this);


        this.callback = function(body, blockedUp, blockedDown, blockedLeft, blockedRight){
            if(blockedDown){
                console.log('boop');
                this.scene.start('birdScene');
            }
        }
        
        this.physics.world.on('worldbounds', this.callback ,this);

        //key inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(0,0, "Kermit",menuConfig).setOrigin(0);

    }
    update(){
        this.player.update();

        

    }
}



