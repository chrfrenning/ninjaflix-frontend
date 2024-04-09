/* requires common.js */

getVideoInfo = function(id) {
    for (var i = 0; i < videos.length; i++) {
        if (videos[i].id == id) {
            return videos[i];
        }
    }
    return null;
}
setupVideo = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    video = getVideoInfo(id);
    document.title = `${video.title} - NinjaFlix`;
    let videoTitle = document.getElementById('video-title');
    videoTitle.innerText = video.title;

    let videoContainer = document.getElementById('video-container');
    videoElement = document.createElement('video');
    videoElement.src = `${baseUrl}videos/${id}.mp4`;
    videoElement.autoplay = true;
    videoElement.controls = true;
    videoContainer.append(videoElement);
};

document.addEventListener("DOMContentLoaded", function() {
    init().then(function() {
        setupVideo();
    });
});