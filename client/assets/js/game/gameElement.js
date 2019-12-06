function loadImage(url) {
    return new Promise(result => {
         let img = new Image();
          img.onload = (() => {
            result(img)}
            );
          img.src = url; 
        });
  }
class GameElement{
    constructor(path, readyCallback){
        this.animations = {}
        this.currentAnimation = null;
        this.x = 0;
        this.y = 0;
        this.sx = 0;
        this.sy = 0;
        this.ax = 0;
        this.ay = 0;
        
        let cuttedPath = path.split('/')
        cuttedPath.splice(-1,1)
        let cutPath = cuttedPath.join('/')
        fetch(path).then((elem)=>{
            elem.json().then((json)=>{
                this.json = json;
                let keys = Object.keys(json.animations);
                let count = 0;
                for (let i in keys){
                    this.addAnimation(keys[i], cutPath, json.animations[keys[i]].images, json.baseWidth * json.gameScaleX, json.baseHeight * json.gameScaleY,json.animations[keys[i]].loop ,()=>{
                        if(++count == keys.length)
                        {
                            this.currentAnimation = this.animations[keys[0]];
                            readyCallback();
                        }                    
                    })
                }
            })
        })

    }
    update(){
        this.currentAnimation.update();
        this.sx += this.ax;
        this.sy += this.ay;
        this.x += this.sx;
        this.y += this.sy;
    }
    draw(context){
        this.currentAnimation.draw(this.x, this.y, context);
    }
    selectAnimation(name){
        if(this.currentAnimation.getName() != name) {
            this.currentAnimation.reset();
            this.currentAnimation = this.animations[name];
        }
    }
    async addAnimation(name, basePath, paths, width, height, loop, callback){
        let count = 0;
        let images = [...paths]
        for (let i in paths)
        {
            let img = await loadImage(basePath + paths[i]);
            images[i] = img;
            
        }
        this.animations[name] = new GameAnimation(name, images, width, height,loop);
        callback();
    }
}
