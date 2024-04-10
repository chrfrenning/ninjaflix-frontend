/* requires common.js */

let currentVideo = null;

setupVideo = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    getVideoInfo(id).then(function(video) {
        currentVideo = video; // save for later

        document.title = `${video.title} - NinjaFlix`;
        let videoTitle = document.getElementById('video-title');
        videoTitle.innerText = video.title;

        let videoContainer = document.getElementById('video-container');
        videoElement = document.createElement('video');
        videoElement.id = 'video';
        videoElement.src = `${baseUrl}videos/${id}.mp4`;
        videoElement.autoplay = false;
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
    // update the bookmark icon
    let bookmarkIcon = document.getElementById('bookmark-icon');
    if (bookmarkIcon.classList.contains('fa-regular')) {
        bookmarkIcon.classList.remove('fa-regular');
        bookmarkIcon.classList.add('fa-solid');
    } else {
        bookmarkIcon.classList.remove('fa-solid');
        bookmarkIcon.classList.add('fa-regular');
    }
    // TODO: Need backend support for bookmarks
};

document.addEventListener("DOMContentLoaded", function() {
    init().then(function() {
        setupVideo();
    });
});