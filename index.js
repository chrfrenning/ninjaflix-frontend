let databaseUrl = "https://chphno.blob.core.windows.net/ninjaflix/database.json?sp=r&st=2024-04-08T19:09:14Z&se=2999-04-09T03:09:14Z&spr=https&sv=2022-11-02&sr=b&sig=%2F0qJTFvLgy3IuixIp45V0qvHhcMoq%2BuPVBgBxp9BWpY%3D";
let baseUrl = "https://chphno.blob.core.windows.net/ninjaflix/";

listVideos = function() {
    fetch(databaseUrl)
        .then(response => response.json())
        .then(data => {
            var videoList = document.getElementById('video-list');
            videoList.children = [];

            var videos = data;
            for (var i = 0; i < videos.length; i++) {
                var video = videos[i];
                var videoItem = document.createElement('li');
                videoItem.className = 'video-list-item';
                videoList.append(videoItem);

                var videoLink = document.createElement('a');
                videoLink.href = "watch.html?id=" + video.id;
                videoItem.append(videoLink);

                var videoThumbnail = document.createElement('img');
                videoThumbnail.src = `${baseUrl}thumbnails/${video.id}.jpg`;
                videoThumbnail.className = "video-thumbnail";

                var videoTitle = document.createElement('div');
                videoTitle.innerText = video.title;
                videoTitle.className = "video-title";

                videoLink.append(videoThumbnail);
                videoLink.append(videoTitle);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    listVideos();
});