//Had to cut will get rid of before final version

/** @type {import ("../../../typings/phaser")} */

class Bird extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)

        scene.add.existing(this);

        this.sfxFlap =  scene.sound.add('flap');
    }
    update(){

        //Set air accelleration
            if(keyLEFT.isDown){
                if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
                    this.sfxFlap.play()
                }
                this.setAccelerationX(-50);
            }
            else if (keyRIGHT.isDown){
                if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                    this.sfxFlap.play();
                }
                this.setAccelerationX(50);
            }
            else if(keyUP.isDown){
                if(Phaser.Input.Keyboard.JustDown(keyUP)){
                    this.sfxFlap.play();
                }
                this.setAccelerationY(-50);
            }
            else if(keyDOWN.isDown){
                if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
                    this.sfxFlap.play();
                }
                this.setAccelerationY(50);
            }
            //Set drag on ground when not holding left or right
            else{
                this.setAcceleration(0);
                this.setDrag(100);
            }
        

    }

}