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
                this.jumping = true;
            }
            if (event.key == 'Control'){
                this.shooting = true;
            }
        })
        window.addEventListener('keyup', (event)=>{
            if (event.key == ' '){
                this.jumping = false;
            }
            if (event.key == 'Control'){
                this.shooting = false;
            }
        })

        window.addEventListener('mousedown', (event)=>{
            if (event.x < this.canvas.width / 2){
                this.jumping = true;
            }
            else{
                this.shooting = true;
            }
        })
        window.addEventListener('keyup', (event)=>{
            if (event.x < this.canvas.width / 2){
                this.jumping = false;
            }
            else{
                this.shooting = false;
            }
        })
    }
    update() {
        console.log('update');
    }
    draw(){
        this.context.fillStyle='#ffff00ff';
        this.context.fillRect(0,0,this.canvas.width, this.canvas.height,1);
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

window.addEventListener('load',() => {
    console.log('load')
    let games = document.getElementsByClassName('game');
    for (let i = 0; i < games.length; ++i){
        let canvas = games[i];
        console.log(canvas);
        canvas.game = new Game(900,600,1,canvas);
        canvas.game.start();
    }
})