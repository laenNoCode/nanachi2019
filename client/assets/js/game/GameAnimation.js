class GameAnimation {
    constructor(name, images, imgWidth, imgHeight, looping = true) {
        //  imgWidth et imgHeight correspondent à la taille de l'image en pixel que l'on veut sur le canvas
        this.images = images;
        this.compteur = -1;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.name = name;
        this.looping = looping;
    }
    
    update() {
        if(this.looping){
            ++this.compteur;
            this.compteur %= this.images.length;
        }
        else if(this.compteur < this.images.length - 1) {
            ++this.compteur;
        }else{
            this.finished = true;
        }
        
    }
    draw(posX,posY,contexte, scaleX = 1.0, scaleY = 1.0) {
        contexte.drawImage(this.images[this.compteur] ,posX, posY, this.imgWidth * scaleX, this.imgHeight * scaleY);
    }
    reset() {
        this.compteur = -1;
        this.finished = false;
    }

    end(){
        this.compteur = this.images.length - 1;
        this.finished = true;
    }

    getName() {
        return this.name;
    }
    
    
}