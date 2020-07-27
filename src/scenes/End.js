//Allows Intellisense to recognize phaser specific commands and libraries
/** @type {import ("../../typings/phaser")} */

class End extends Phaser.Scene{
    constructor(){
        super("endScene");
    }
    create(){


        let NAMESPACER=30;
        let TITLESPACER=20;

        //instuction text configuration
        let instructConfig = {
            fontFamily: 'Lucida',
            fontSize: '16px',
            align: 'left',
            wordWrap: {
                width: 428,
            }

        }

        //config for name text
        let nameConfig = {
            fontFamily: 'Lucida',
            fontSize: '24px',
            align: 'left'

        }

        //config for title text
        let titleConfig = {
            fontFamily: 'Lucida',
            fontSize: '16px',
            align: 'left'
        }


        //add background
        this.add.image(0,0,'TitleCard').setOrigin(0);
        
        //set scene gravity
        this.physics.world.gravity.y = 250;

        //restart instructions
        this.instructions = this.add.text(212,417,'Run off the left edge of the screen to return to start screen. Run off the right edge of the screen to return to the level.', instructConfig).setOrigin(0);

        //add a floor to collide with
        this.floor = this.add.rectangle(0,417,game.config.width,63,0xff0000,0).setOrigin(0);
        this.physics.add.existing(this.floor,true);
        

        
        //add credits
        this.add.text(48,166,'Programmer',titleConfig).setOrigin(0);
        this.add.text(48,166+TITLESPACER,'Sean Carpenter',nameConfig).setOrigin(0);

        this.add.text(48,166+(TITLESPACER+NAMESPACER),'Background, Platform, and UI Elements Design', titleConfig).setOrigin(0);
        this.add.text(48,166+(TITLESPACER*2+NAMESPACER),'Ariana Lazich', nameConfig).setOrigin(0);

        this.add.text(48,166+2*(TITLESPACER+NAMESPACER),'Animation and Title Screen Design', titleConfig).setOrigin(0);
        this.add.text(48,166+(TITLESPACER*3+NAMESPACER*2),'Drew Parker', nameConfig).setOrigin(0);

        this.add.text(48,166+3*(TITLESPACER+NAMESPACER),'Sound and Music Design', titleConfig).setOrigin(0);
        this.add.text(48,166+(TITLESPACER*4+NAMESPACER*3),'Ashwin Gupta', nameConfig).setOrigin(0);

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

        //play background music
        this.endMusic = this.sound.add('MenuMusic',{loop:true});
        this.endMusic.play();


    }

    update(){
        this.player.update();

        //move offscreen to start game
        if (this.player.body.position.x > game.config.width){
            this.endMusic.stop();
            while(this.endMusic.isPlaying){
                this.endMusic.stop();
            }
            this.scene.start('frogScene');
        }
        if(this.player.body.position.x + this.player.width < 0){
            this.endMusic.stop();
            while(this.endMusic.isPlaying){
                this.endMusic.stop();
            }
            this.scene.start('introScene');
        }
        
    }
}