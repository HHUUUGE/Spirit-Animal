/** @type {import ("../../../typings/phaser")} */

class Frog extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)

        scene.add.existing(this);

        this.onGround = false;

        this.sfxJump =  scene.sound.add('jump');

    }
    update(){

        //Set ground accelleration
        if (this.onGround){
            if(keyLEFT.isDown){
                if(this.body.velocity.x>0){
                    this.setDragX(20);
                }
                this.setAccelerationX(-100);
            }
            else if (keyRIGHT.isDown){
                if(this.body.velocity.x<0){
                    this.setDragX(20);
                }
                this.setAccelerationX(100);
            }
            //Set drag on ground when not holding left or right
            else{
                this.setAccelerationX(0);
                this.setDragX(100);
            }
        }
        //Set air movement
        else{
            if(keyLEFT.isDown){
                this.setAccelerationX(-40);
            }
            else if (keyRIGHT.isDown){
                this.setAccelerationX(40);
            }
            //set drag in air when not holding left or right
            else{
                this.setAccelerationX(0);
                this.setDragX(20);
            }
        }
        //Jump when pressing space
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.onGround){
            this.onGround=false;
            this.setVelocityY(-400);
            this.sfxJump.play();

        }

    }
    //reset inAir flag
    reset(){
        this.onGround=true;
    }

}