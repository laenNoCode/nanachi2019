
let imports = ["/assets/js/game/gameElement.js","/assets/js/game/GameAnimation.js","/assets/js/game/mainCharacter.js","/assets/js/game/Ground.js"]
let countImported = 0;
let allLoadedCallback = function () {};
function　loadCallback(){
    ++countImported;
    if (countImported == imports.length){
        allLoadedCallback();
    }
}
function importScript(name){
    fetch(name).then((data)=>{
        data.text().then((text) =>{
            setTimeout(text+"\nloadCallback();", 1);
        })
    })
}

for (let script in imports){
    importScript(imports[script]);
}

class Game{
    constructor(width, height, speed, canvas, fps=1) {
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.canvas = canvas;
        this.fps = fps; 
        this.context = canvas.getContext('2d');
        this.jumping=false;
        this.shooting = false;
        canvas.height = height;
        canvas.width = width;
    }

    init(){
        window.addEventListener('keydown', (event)=>{
            if (event.key == ' '){
                this.character.jumping = true;
            }
            if (event.key == 'Control'){
                this.character.shooting = true;
            }
        })
        window.addEventListener('keyup', (event)=>{
            if (event.key == ' '){
                this.character.jumping = false;
            }
            if (event.key == 'Control'){
                this.character.shooting = false;
            }
        })

        window.addEventListener('mousedown', (event)=>{
            if (event.x < this.canvas.width / 2){
                this.character.jumping = true;
            }
            else{
                this.character.shooting = true;
            }
        })
        window.addEventListener('mouseup', (event)=>{
            if (event.x < this.canvas.width / 2){
                this.character.jumping = false;
            }
            else{
                this.character.shooting = false;
            }
        })
    }
    update() {
        console.log(this.canvas.height)
        this.character.update(this.canvas.height);
    }
    draw(){
        this.context.fillStyle='#ffff00ff';
        this.context.fillRect(0,0,this.canvas.width, this.canvas.height,1);
        this.character.draw(this.context);
    }
    onEvent(event){

    }
    start(){
        this.init();
        window.setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / this.fps);
    }
}

function  allLoaded() {
    console.log('load')
    let games = document.getElementsByClassName('game');
    for (let i = 0; i < games.length; ++i){
        let canvas = games[i];
        console.log(canvas);
        canvas.game = new Game(900,600,10,canvas,4);
        canvas.game.start();
        canvas.game.character = new MainCharacter("/assets/gameElements/mainCharacter/mainCharacter.json", ()=>{
            console.log(canvas.game.character);
        });
    }
    
}

window.addEventListener('load',() => {
    if (countImported == imports.length){
        allLoaded();
    }
    else{
        allLoadedCallback = allLoaded;
    }

})