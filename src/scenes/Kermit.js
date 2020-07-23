
//Allows Intellisense to recognize phaser specific commands and libraries
/** @type {import ("../../typings/phaser")} */

class Kermit extends Phaser.Scene{
    constructor(){
        super("frogScene");
    }

    preload(){
        //temp frog sprite borrowed from internet
        this.load.atlas('witch', './assets/Character.png', './assets/Character.json');
        this.load.image('frog',"./assets/step4.jpg")
        this.load.image('swamp', "./assets/swamp.png")
        this.load.image('platforms','./assets/swamp assets.png')
        this.load.tilemapTiledJSON('swamp_map', './assets/swamp.json')
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
        
        //create tilemap
        const map = this.add.tilemap("swamp_map");
        const tileset =  map.addTilesetImage('swampAssets', 'platforms');
        
        //for compares in update()
        this.map=map;

        //set scene gravity
        this.physics.world.gravity.y = 250;
        
        //set backgound
        this.swamp = this.add.tileSprite(0,0,game.config.width,game.config.height,'swamp').setOrigin(0);
        
        //prep background for scroll
        this.swamp.setScrollFactor(0);

        //set up tilemap layers
        //platform tiles
        const platformTiles = map.createStaticLayer("Platforms",tileset, 0, 0);
        
        //spawn and goal objects
        const importantPoints= map.createStaticLayer("ImportantPoints", tileset, 0, 0);
        
        //set spawn point
        const spawn= map.findObject("ImportantPoints", obj => obj.name === "Spawn");

        //give platform tiles collision
        platformTiles.setCollisionByProperty({collides: true});


        //create player character using frog instance
        this.player = new Frog(this, spawn.x, spawn.y, 'witch','Idle000');
        
        //enable physics for sprite
        this.physics.world.enable(this.player);
        this.player.setMaxVelocity(500)
        //set bounce and player collision
        this.player.setBounce(0.1);
        this.player.body.onCollide=true;


        //set platform collision, reset inAir trigger on collision
        this.physics.add.collider(this.player, platformTiles);
        //this.physics.world.setBoundsCollision(true,true,true,false);
        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels,true, true, true, false);
        this.player.setCollideWorldBounds(true);
        //key inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //set camera to follow player 
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(.5,0);

        //silly scene text for debug
        //this.add.text(0,0, "Kermit",menuConfig).setOrigin(0);

    }
    update(){

        //player update loop
        this.player.update();

        //collision with tiles
        if (this.player.body.blocked.down){
            this.player.reset();
        }

        //player falls off screen -> restart scene
        if (this.player.body.position.y>game.config.height){
            this.scene.restart();
        }

        //player about to go off screen -> set y velocity to 0
        // if (this.player.body.position.y<0){
        //     this.player.setAccelerationY(0);
        //     this.player.setVelocityY(0);
        // }

        //player about to run off right side of scene -> set x velocity to 0
        // if (this.player.body.position.x + this.player.width>this.map.widthInPixels || this.player.body.position.x < 0){
        //     //this.player.setAccelerationX(0);
        //     this.player.setVelocityX(0);
        // }

        //carmera scrolls -> background scrolls proportionally
        this.swamp.tilePositionX=this.cameras.main.scrollX*.3
        

    }
}



