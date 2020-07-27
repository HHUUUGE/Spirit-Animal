/** @type {import ("../../../typings/phaser")} */

class Frog extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)

        scene.add.existing(this);

        //flag to control when player can jump
        this.onGround = true;

        //flag to keep transformation animation in check
        this.human = true;

        //jump sound effect
        this.sfxJump =  scene.sound.add('jump');


    }

    update(){

        //Set ground accelleration
        if (this.onGround){
            //going left
            if(keyLEFT.isDown){

                //flip sprite horizonally
                if(!this.flipX){
                    this.setFlipX(true);
                }

                //set low drag when running in a direction to give some 
                if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                    this.setDragX(10);
                }
                this.setAccelerationX(-80);
                this.anims.play('Running',true)
            }
            //facing right, unflip sprite
            else if (keyRIGHT.isDown){
                if(this.flipX){
                    this.setFlipX(false);
                }
                if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                    this.setDragX(10);
                }
                this.setAccelerationX(80);
                this.anims.play('Running',true)
            }
            //Set drag on ground when not holding left or right
            else{
                this.setAccelerationX(0);
                this.setDragX(75);
                if(this.body.velocity.x==0){
                    this.anims.play('Idle',true);
                }
            }
        }
        //Set air movement
        else{

            //transform from frog to human
            if(this.human==false && this.body.velocity.y>0){
                this.human=true;
                this.body.setSize(this.body.width,43,false);
                this.anims.playReverse('Transform',true);
            }

            //in air facing left
            if(keyLEFT.isDown){

                //flip sprite horizontally
                if(!this.flipX){
                    this.setFlipX(true);
                }
                this.setAccelerationX(-80);
            }
            //facing right unflip sprite set positive acceleration
            else if (keyRIGHT.isDown){
                if(this.flipX){
                    this.setFlipX(false);
                }
                this.setAccelerationX(80);
            }
            //set drag in air when not holding left or right
            else{
                this.setAccelerationX(0);
                this.setDragX(30);
            }
        }

        //Jump when pressing space & transform into a frog 
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.onGround){
            this.human=false;
            this.anims.play('Transform');
            this.anims.chain('Jump');
            this.body.setSize(this.body.width,20,false);
            this.setVelocityY(-200);
            this.onGround=false;
            this.sfxJump.play();

        }

    }
    //reset onGround flag
    reset(){
        this.onGround=true;
    }

}