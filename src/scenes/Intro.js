//Allows Intellisense to recognize phaser specific commands and libraries
/** @type {import ("../../typings/phaser")} */

class Intro extends Phaser.Scene{
    constructor(){
        super("introScene");
    }
    preload(){
        //load control image
        this.load.atlas('controls','./assets/Controls.png','./assets/Controls.json');

        //load background image
        this.load.image('TitleCard','./assets/Spirit Animal Title and Credit.png');

        //load character animation
        this.load.atlas('witch', './assets/Character.png', './assets/Character.json');
        
        //load sfx
        this.load.audio('jump', './assets/jump_sfx.wav');

        //load music level music
        this.load.audio('LevelTrack','./assets/Level track.wav');

        //load menu music
        this.load.audio('MenuMusic', './assets/title_track.wav');

        //load level background
        this.load.image('swamp', "./assets/swamp.png");

        //load level tile assets
        this.load.image('platforms','./assets/swamp assets.png');

        //load level tile map
        this.load.tilemapTiledJSON('swamp_map', './assets/swamp.json');



    }
    create(){

        //instuction text configuration
        let instructConfig = {
            fontFamily: 'Lucida',
            fontSize: '20px',
            align: 'center'

        }

        //create Background
        this.add.image(0,0,'TitleCard').setOrigin(0);

        //Create character animations
        this.anims.create({
            key: 'Idle',
            frames: this.anims.generateFrameNames('witch',{
                prefix: 'Idle',
                start: 1,
                end: 14,
                zeroPad: 2
            }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'Jump',
            frames: this.anims.generateFrameNames('witch',{
                prefix: 'Jump',
                start: 1,
                end: 7,
                zeroPad: 2
            }),
            frameRate: 30,
            repeat: 0
        });

        this.anims.create({
            key: 'Running',
            frameRate: 30,
            frames: this.anims.generateFrameNames('witch',{
                prefix: 'Run',
                start: 1,
                end: 12,
                zeroPad: 2
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'Transform',
            frames: this.anims.generateFrameNames('witch',{
                prefix: 'Trans',
                start: 1,
                end: 10,
                zeroPad: 2
            }),
            frameRate: 48, 
            repeat: 0
        });






        //add the controls
        this.left = this.add.sprite(212, 417,'controls','LEFT').setOrigin(0);
        this.space = this.add.sprite(331, 417,'controls','SPACE').setOrigin(0);
        this.right = this.add.sprite(549, 417,'controls','RIGHT').setOrigin(0);

        //set scene gravity
        this.physics.world.gravity.y = 250;

        
        //add a floor to collide with
        this.floor = this.add.rectangle(0,417,game.config.width,63,0xff0000,0).setOrigin(0);
        this.physics.add.existing(this.floor,true);

        this.instructions=this.add.text(game.config.width/2, 216,'Practice moving around. Walk off screen to go to play.',instructConfig).setOrigin(0.5,0);


        //create player character using frog instance
        this.player = new Frog(this, game.config.width/2, game.config.height/2, 'witch','Idle01');
        //enable physics for sprite
        this.physics.world.enable(this.player);
        this.player.setMaxVelocity(200);
        //set bounce and player collision
        this.player.setBounce(0.1);
        this.player.body.onCollide=true;


        //set floor collision, reset inAir trigger on collision
        this.physics.add.collider(this.player, this.floor, function touchDown(player,floor){
            if(!player.onGround){
                player.reset();
            }
        });


        //input keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //start background music
        this.startMusic = this.sound.add('MenuMusic',{loop:true});
        this.startMusic.play();

    }

    update(){
        this.player.update();

        //show what buttons the player is pressing
        if(keySPACE.isDown){
            this.space.setAlpha(.5);

        }
        else{
            this.space.setAlpha(1);
        }
        if(keyLEFT.isDown){
            this.left.setAlpha(.5);

        }
        else{
            this.left.setAlpha(1);
        }
        if(keyRIGHT.isDown){
            this.right.setAlpha(.5);

        }
        else{
            this.right.setAlpha(1);
        }

        //move offscreen to start game
        if (this.player.body.position.x > game.config.width || this.player.body.position.x + this.player.width < 0){
            this.startMusic.stop();
            this.scene.start('frogScene');
        }
    }
}