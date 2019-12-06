window.addEventListener('load', ()=>{
    document.getElementById("overlay").style.display = "block";
    window.score = 0;
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
    function placeBlock(){
        var x = (Math.random()*100).toString(10)+'%';
        var y = (Math.random()*100).toString(10)+'%';
        var c = getRandomColor();
        var bl = document.getElementById("myblock");
        bl.position = "absolute";
        bl.style.top = x;
        bl.style.left = y;
        bl.style.backgroundColor = c;
    }
    var vid = document.getElementById("rickroll");
        window.myfunc = function(){
            document.getElementById("overlay").style.display = "none";
            vid.play();
            //vid.playbackRate = 4;
            faster(vid);
            window.start_time = new Date();
            window.now = new Date();
            window.start_level = 0.9;
            window.end_level = 10;
            window.tau = 6000000;
            vid.playbackRate = start_level;
    
            
            document.getElementById("myscore").style.display = "block";
            playing();
        }
    
    function faster(vid) {
        setInterval(alertFunc, 10000, vid);
    }
                
    function alertFunc(vid) {
        window.now = new Date();
        //vid.playbackRate = now.getTime()/1000;
        window.fraction = (window.start_time.getTime() - window.now.getTime()) / window.tau;
        vid.playbackRate = window.start_level + (window.end_level - window.start_level) * (1 - Math.exp(window.fraction));
    }
    
    
    
    
    
    function playing(){
        setInterval (makeBloc, 2000 / vid.playbackRate);
      }
    
    function makeBloc(){
        placeBlock();
        document.getElementById("myblock").style.display = "block";
        setTimeout(killBloc,1000 / vid.playbackRate);
    }
    
    function killBloc(){
        document.getElementById("myblock").style.display = "none";
    }
    
    window.scoring = function(){
        window.score+=1;
        document.getElementById("myblock").style.display = "none";
        document.getElementById("myscore").textContent = "Score : " + window.score;
    }
})
