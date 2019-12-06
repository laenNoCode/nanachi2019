document.addEventListener('DOMContentLoaded',()=>
{
    let video = document.getElementById("rickroll");
    video.volume = 0.1;
    console.log("ok");
    video.play();
    document.body.addEventListener("mouseover" ,()=>{
        video.play();
    })
    //video.controls=false;
}

);
console.log("loaded")