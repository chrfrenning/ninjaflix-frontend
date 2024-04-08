let databaseUrl = "https://chphno.blob.core.windows.net/ninjaflix/database.json?sp=r&st=2024-04-08T19:09:14Z&se=2999-04-09T03:09:14Z&spr=https&sv=2022-11-02&sr=b&sig=%2F0qJTFvLgy3IuixIp45V0qvHhcMoq%2BuPVBgBxp9BWpY%3D";
let baseUrl = "https://chphno.blob.core.windows.net/ninjaflix/";

getVideoInfo = function(id) {
    return fetch(databaseUrl)
        .then(response => response.json())
        .then(data => {
            var videos = data;
            for (var i = 0; i < videos.length; i++) {
                if (videos[i].id == id) {
                    return videos[i];
                }
            }
            return null;
        });

}
setupVideo = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    getVideoInfo(id).then(video => {
        document.title = `${video.title} - NinjaFlix`;
        let videoTitle = document.getElementById('video-title');
        videoTitle.innerText = video.title;

        let videoContainer = document.getElementById('video-container');
        videoElement = document.createElement('video');
        videoElement.src = `${baseUrl}videos/${id}.mp4`;
        videoElement.autoplay = true;
        videoElement.controls = true;
        videoContainer.append(videoElement);

    });
};

document.addEventListener("DOMContentLoaded", function() {
    setupVideo();
});