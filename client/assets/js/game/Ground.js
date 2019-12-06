class Ground extends GameElement {
    constructor(path, sx,widthCanvas,heigthCanvas, readyCallback) {
        // contrainte : deux plateformes ne doivent pas être collées, ne doivent pas avoir des grandeurs nulles, la vitesse est négative ?
        super(path,()=> { 
            this.heigthElem = this.json.baseHeight* this.json.gameScaleY;
            this.widthElem = this.json.baseWidth* this.json.gameScaleX;
            this.sx = sx;
            this.xInit = widthCanvas;
            this.yInit = heigthCanvas - this.heigthElem;
            this.x = this.xInit  + 50 + 40 * Math.random();
            this.y = this.yInit;
            this.flag =false;
            
            readyCallback(); 
        });
    }
    getHeigth() {
        return this.heigthElem;
    }
    getWidth() {
        return this.widthElem;
    }
    update(){
        this.currentAnimation.update();
        this.sx += this.ax;
        this.x += this.sx; 
    }
    copy(width) {
        let obj = {}
        for (let key in Object.keys(this)){
            key = Object.keys(this)[key]
            obj[key] = JSON.parse(JSON.stringify(this[key]));
            if(typeof(key) == 'function'){
                obj[key] = this[key]
            }
        }
        obj.currentAnimation. __proto__ = this.currentAnimation.__proto__
        obj.currentAnimation.images = this.currentAnimation.images
        console.log('new')
            console.log(Math.floor(40 * Math.random()))
            obj.x = width  + 50 + Math.floor(40 * Math.random());
            obj.__proto__ = this.__proto__;
            console.log(obj)
        return obj
    }

}