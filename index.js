/* requires common.js */

addVideosToList = function(videos, listItemId = "video-list") {
    var videoList = document.getElementById(listItemId);
    videoList.children = [];

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
}

document.addEventListener("DOMContentLoaded", function() {
    init().then(function() {
        listVideos().then(function(videos) {
            addVideosToList(videos);
        });
    });
});