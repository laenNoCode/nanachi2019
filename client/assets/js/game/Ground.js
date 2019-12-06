class Ground extends GameElement {
    constructor(path, readyCallback,heigthElem,widthElem,sx,heigthCanvas,widthCanvas,mainCarac) {
        // contrainte : deux plateformes ne doivent pas être collées, ne doivent pas avoir des grandeurs nulles, la vitesse est négative ?
        super(path,readyCallback);
        this.heigthElem = heigthElem;
        this.widthElem = widthElem;
        this.sx = sx;
        this.xInit = widthCanvas;
        this.yInit = heigthCanvas - heigthElem;
        this.x = this.xInit;
        this.y = this.yInit;
        this.printed = false;
        this.mainCarac = mainCarac;
    }
    successionCompatible(groundSucc,limite) {
        return ((groundSucc.getHeigth() - this.getHeigth()) < limite);
    }
    getHeigth() {
        return this.heigthElem;
    }
    getWidth() {
        return this.widthElem;
    }
    update(){
        this.sx += this.ax;
        this.x += this.sx; 
        if(x<=0){
            this.mainCarac.setPlatform(this);
        }
        if(this.x < -this.widthElem){
            this.printed = false;
            this.x = this.xInit;
            this.y = this.yInit;
            this.mainCarac.unsetPlatform();
        }
        if(this.x<this.xInit) {
            this.printed = true;
        }
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.widthElem, this.heigthElem);
    }
    isVisible() {
        return this.printed;
    }

}