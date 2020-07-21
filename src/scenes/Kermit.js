
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
        
        const map = this.add.tilemap("swamp_map");
        const tileset =  map.addTilesetImage('swampAssets', 'platforms');
        this.map=map;
        //set scene gravity
        this.physics.world.gravity.y = 250;
        
        //set backgound
        this.swamp = this.add.tileSprite(0,0,game.config.width,game.config.height,'swamp').setOrigin(0);
        this.swamp.setScrollFactor(0);
        const platformTiles = map.createStaticLayer("Platforms",tileset, 0, 0);
        const importantPoints= map.createStaticLayer("ImportantPoints", tileset, 0, 0);
        const spawn= map.findObject("ImportantPoints", obj => obj.name === "Spawn");


        platformTiles.setCollisionByProperty({collides: true});


        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // platformTiles.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        //create immovable platforms for ground
        //this.ground = this.physics.add.staticGroup();
        //this.ground.create(160, 430,'floor').setScale(1.5,.5).refreshBody();
        //this.ground.create(600,150,'floor' ).setScale(1.7,.25).refreshBody();
        //this.ground.propertyValueSet('Body.friction.x', 1);

        //create player character using frog instance
        this.player = new Frog(this, spawn.x, spawn.y, 'witch','Idle000');
        
        //enable physics for sprite
        this.physics.world.enable(this.player);
        this.player.setMaxVelocity(500)
        //set bounce and player collision
        this.player.setBounce(0.2);
        this.player.body.onCollide=true;


        //set platform collision, reset inAir trigger on collision
        this.physics.add.collider(this.player, platformTiles);

        //key inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(.5,0);


        this.add.text(0,0, "Kermit",menuConfig).setOrigin(0);

    }
    update(){
        this.player.update();

        if (this.player.body.onFloor()){
            this.player.reset();
        }

        if (this.player.body.position.y>game.config.height){
            this.scene.restart();
        }

        if (this.player.body.position.y<0){
            this.player.body.position.y=0;
        }

        if (this.player.body.position.x + this.player.w>this.map.widthInPixels){
            this.player.body.position.x=this.map.widthInPixels;
        }

        this.swamp.tilePositionX=this.cameras.main.scrollX*.3
        

    }
}



