/** @type {import ("../../../typings/phaser")} */

class Frog extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)

        scene.add.existing(this);

        this.inAir = false;

        this.sfxJump =  scene.sound.add('jump');

    }
    update(){

        //Set ground accelleration
        if (!this.inAir){
            if(keyLEFT.isDown){
                this.setAccelerationX(-50);
            }
            else if (keyRIGHT.isDown){
                this.setAccelerationX(50);
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
                this.setAccelerationX(-10);
            }
            else if (keyRIGHT.isDown){
                this.setAccelerationX(10);
            }
            //set drag in air when not holding left or right
            else{
                this.setAccelerationX(0);
                this.setDragX(15);
            }
        }
        //Jump when pressing space
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.inAir){
            this.inAir=true;
            this.setVelocityY(-400);
            this.sfxJump.play();

        }

    }
    //reset inAir flag
    reset(){
        this.inAir=false;
    }

}