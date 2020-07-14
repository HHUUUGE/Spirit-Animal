/** @type {import ("../../../typings/phaser")} */

class Frog extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)

        scene.add.existing(this);

        this.inAir = false;

    }
    update(){
        this.maxVelocity;

        if (!this.inAir){
            if(keyLEFT.isDown){
                this.setAccelerationX(-50);
            }
            else if (keyRIGHT.isDown){
                this.setAccelerationX(50);
            }
            else{
                this.setAccelerationX(0);
                this.setDragX(100);
            }
        }
        else{
            if(keyLEFT.isDown){
                this.setAccelerationX(-10);
            }
            else if (keyRIGHT.isDown){
                this.setAccelerationX(10);
            }
            else{
                this.setAccelerationX(0);
                this.setDragX(15);
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.inAir){
            this.inAir=true;
            this.setVelocityY(-400);
        }

    }

    reset(){
        this.inAir=false;
    }

}