var controllerVideo = document.getElementById("controllerVideo");

var video = document.getElementById("mainVideo");

controllerVideo.onclick = function() {
    if (this.classList.contains("mute")) {
        this.classList.remove("mute");
        this.classList.add("unmute");
        video.muted = false;        
    } else {
        this.classList.remove("unmute");
        this.classList.add("mute");
        video.muted = true; 
    }
}