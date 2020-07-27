
//Allows Intellisense to recognize phaser specific commands and libraries
/** @type {import ("../../typings/phaser")} */

class Kermit extends Phaser.Scene{
    constructor(){
        super("frogScene");
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

        this.bgm=this.sound.add('LevelTrack',{loop:true});
        this.bgm.play();
        
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
        this.player = new Frog(this, spawn.x, spawn.y, 'witch','Idle01');

        //enable physics for sprite
        this.physics.world.enable(this.player);
        this.player.setMaxVelocity(200);

        //set bounce and player collision
        this.player.setBounce(0.1);
        this.player.body.onCollide=true;

        //set platform collision, reset inAir trigger on collision
        this.physics.add.collider(this.player, platformTiles, function touchDown(player,platform){
            if(!player.onGround){
                player.reset();
            }
        });

        //making every worldbound other than the floor collidable
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

        this.goal= this.add.rectangle(3100,431,157,32,0xff0000,0);
        this.physics.add.existing(this.goal,true);

        this.physics.add.overlap(this.player,this.goal, function reachedEnd(player,goal){
            this.bgm.stop();
            this.scene.start('endScene');
        },null,this);



    }
    update(){

        //player update loop
        this.player.update();

        //player falls off screen -> restart scene
        if (this.player.body.position.y>game.config.height){
            this.bgm.stop();
            this.scene.restart();
        }

        //carmera scrolls -> background scrolls proportionally
        this.swamp.tilePositionX=this.cameras.main.scrollX
        

    }
}



