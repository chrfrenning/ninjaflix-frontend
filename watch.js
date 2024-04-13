/* requires common.js */

let currentVideo = null;

setupVideo = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    return new Promise((resolve, reject) => {

        getVideoInfo(id).then(function(video) {
            currentVideo = video; // save for later

            document.title = `${video.title} - NinjaFlix`;
            let videoTitle = document.getElementById('video-title');
            videoTitle.innerText = video.title;

            let videoContainer = document.getElementById('video-container');
            videoElement = document.createElement('video');
            videoElement.id = 'video';
            videoElement.src = `${baseUrl}videos/${id}.mp4`;
            videoElement.autoplay = true;
            videoElement.controls = true;
            videoContainer.append(videoElement);

            let likeCount = document.getElementById('like-count');
            let dislikeCount = document.getElementById('dislike-count');
            let favoriteIcon = document.getElementById('favorite-icon');

            likeCount.innerText = `${video.likes}`;
            dislikeCount.innerText = `${video.dislikes}`;
            if (video.favorite) {
                favoriteIcon.classList.add('fa-solid');
            } else {
                favoriteIcon.classList.add('fa-regular');
            }

            let bookmarkIcon = document.getElementById('bookmark-icon');
            if (video.bookmarked) {
                bookmarkIcon.classList.add('fa-solid');
            } else {
                bookmarkIcon.classList.add('fa-regular');
            }

            resolve(video);
        });

    });
};

likeVideo = function() {
    // update the number of likes
    currentVideo.likes++;

    // show it to the user
    let likeCount = document.getElementById('like-count');
    likeCount.innerText = `${currentVideo.likes}`;

    // save it for next time
    saveFavLikeDisState(currentVideo.id, false, true, false);

    return false;
};

dislikeVideo = function() {
    // update the number of dislikes
    currentVideo.dislikes++;

    // show it to the user
    let dislikeCount = document.getElementById('dislike-count');
    dislikeCount.innerText = `${currentVideo.dislikes}`;

    // save it for next time
    saveFavLikeDisState(currentVideo.id, false, false, true);
};

favoriteVideo = function() {
    // toggle favorite state
    video.favorite = !video.favorite;

    // update the favorite icon
    let favoriteIcon = document.getElementById('favorite-icon');
    if (favoriteIcon.classList.contains('fa-regular')) {
        favoriteIcon.classList.remove('fa-regular');
        favoriteIcon.classList.add('fa-solid');
    } else {
        favoriteIcon.classList.remove('fa-solid');
        favoriteIcon.classList.add('fa-regular');
    }

    // save it for next time
    saveFavLikeDisState(currentVideo.id, true, false, false);
};

bookmarkVideo = function() {
    // toggle bookmark state
    currentVideo.bookmarked = !currentVideo.bookmarked;

    // update the bookmark icon
    let bookmarkIcon = document.getElementById('bookmark-icon');
    if (bookmarkIcon.classList.contains('fa-regular')) {
        bookmarkIcon.classList.remove('fa-regular');
        bookmarkIcon.classList.add('fa-solid');

        saveBookmark(currentVideo.id, true);
    } else {
        bookmarkIcon.classList.remove('fa-solid');
        bookmarkIcon.classList.add('fa-regular');

        saveBookmark(currentVideo.id, false);
    }
    
    return false;
};

addVideosToList = function(videos, listItemId = "video-list") {
    var videoList = document.getElementById(listItemId);
    videoList.innerHTML = '';

    for (var i = 0; i < videos.length; i++) {
        var video = videos[i];
        var videoItem = document.createElement('li');
        videoItem.className = 'video-list-item';
        videoList.append(videoItem);

        var videoLink = document.createElement('a');
        videoLink.className = "video-link";
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
        setupVideo().then(function() {
            // setup the recommended videos
            listRecommendedVideos(currentVideo.id).then(function(videos) {
                let recommendedVideos = document.getElementById('video-list-recommended');
                addVideosToList(videos, 'video-list-recommended');
            });
            listBookmarkedVideos().then(function(videos) {
                let bookmarkedVideos = document.getElementById('video-list-saved');
                addVideosToList(videos, 'video-list-saved');
            });
        });
    });
});


