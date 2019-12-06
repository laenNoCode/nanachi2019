class MainCharacter extends GameElement{
    constructor(path, heigthCanvas, readyCallback){
        super(path,()=>{    
            this.shooting = false;
            this.jumpingSpeed = this.json.jumpingSpeed;
            this.gravity = this.json.gravity;
            this.reloadTime = this.json.reloadTime;
            this.reload = this.reloadTime
            this.currentPlatform = null;
            this.heigthCanvas = heigthCanvas;
            this.heigthCharac = this.currentAnimation.imgHeight;
            this.y = this.heigthCanvas - this.heigthCharac - 30;
            readyCallback();
        });
    }
    
    update(height, enemies, enemyWeapons, platforms){
        this.reload --;
        if(this.shooting && this.reload <= 0)
        {
            this.selectAnimation('shooting')
            this.reload = this.reloadTime;
        }
        let touching = (this.groundDistance(height,platforms) <= this.sy);
        if(this.currentAnimation.getName() == "shooting"){
            
            this.sy = 0;
            if(this.currentAnimation.finished){
                if (touching){
                    this.selectAnimation('running')
                }
                else{
                    this.selectAnimation('jumping')
                    this.currentAnimation.end();
                }
            }
        }
        if(this.currentAnimation.getName() != 'shooting'){
            if(touching)
            {
                this.ay = 0;
                this.sy = this.groundDistance(height,platforms);
                if(this.jumping){
                    this.sy = this.jumpingSpeed;
                    this.selectAnimation("jumping");
                }
                else{
                    this.selectAnimation("running")
                }
            }
            else{
                this.ay = this.gravity;
            }
        }
        super.update();
    }

    groundDistance(height, platforms) {
        //TODO: implement this
        return height - this.y - 30 - this.currentAnimation.imgHeight;
    }

    setPlatform(plateform) {
        this.currentPlatform = plateform;
    }

    unsetPlatform() {
        this.currentPlatform = null;
    }

}