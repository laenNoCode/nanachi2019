document.addEventListener('DOMContentLoaded',()=>
{
    let video = document.getElementById("rickroll");
    video.volume = 0.01;
    console.log("ok");
    video.play();
    video.addEventListener("hover" ,()=>{
        video.play();
    })
    //video.controls=false;
}

);
console.log("loaded")