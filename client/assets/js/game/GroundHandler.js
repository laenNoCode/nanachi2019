class GroundHandler{
    constructor(path, sx,widthCanvas ,heightCanvas , callback){
        this.plateforms = []

        this.widthCanvas = widthCanvas
        this.loadPlateforms(path, sx,widthCanvas , heightCanvas, ()=>{

            let pick = this.plateformTypes[0].copy()
            pick.currentAnimation.imgWidth = widthCanvas;
            pick.width = widthCanvas;
            pick.x = 0;
            this.plateforms.push(pick);
            callback();    
        })
        
    }

    loadPlateforms(path, sx, widthCanvas, heightCanvas, callback){
        //"/assets/GameElements/platform/platforms.js"
        
        let cuttedPath = path.split('/')
        cuttedPath.splice(-1,1)
        let cutPath = cuttedPath.join('/')
        fetch(path).then((resp)=>{
            resp.json().then((json)=>{
                let plateformes = json.plateformes
                this.plateformTypes = plateformes;
                this.plateformProto = [...this.plateformTypes];
                let count = 0;
                for (let i in plateformes)
                {
                    //load different types of plateforms
                    this.plateformTypes[i] = new Ground(cutPath + plateformes[i], sx,widthCanvas , heightCanvas, ()=>{
                        if(++count == plateformes.length){
                            callback();
                        }
                    } )
                }
            })
        })
    }

    update(){
        
        let plateforms = this.plateforms
        this.plateforms.forEach(element => element.update());
        if (plateforms[0].getWidth() + plateforms[0].x<0)
        {
            plateforms.pop(0);
        }
        let lastPlateform = plateforms[plateforms.length - 1]
        if(lastPlateform.x + lastPlateform.getWidth() <　this.widthCanvas){
            this.generatePlateform(this.widthCanvas);
        }
        
    }
    draw(context){
        
        for(let i in this.plateforms){
            
            let plat = this.plateforms[i]
            plat.draw(context)
        }
    }
    generatePlateform(){
        console.log(this.plateformTypes)
        let pick = Math.floor(Math.random()*this.plateformTypes.length);
        this.plateforms.push(this.plateformTypes[pick].copy(this.widthCanvas));
    }
}