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
    addLike(currentVideo.id).then(function(video) {
        currentVideo = video;
    
        // show it to the user
        let likeCount = document.getElementById('like-count');
        likeCount.innerText = `${currentVideo.likes}`;

    });

    return false;
};

dislikeVideo = function() {
    // update the number of dislikes
    addDislike(currentVideo.id).then(function(video) {
        currentVideo = video;

        // show it to the user
        let dislikeCount = document.getElementById('dislike-count');
        dislikeCount.innerText = `${currentVideo.dislikes}`;

    });
    
    return false;
};

favoriteVideo = function() {
    // toggle favorite state
    saveFavorite(currentVideo.id, !currentVideo.favorite).then(function(video) {
        currentVideo = video;

        // update the favorite icon
        let favoriteIcon = document.getElementById('favorite-icon');
        if ( currentVideo.favorite ) {
            favoriteIcon.classList.remove('fa-regular');
            favoriteIcon.classList.add('fa-solid');
        } else {
            favoriteIcon.classList.remove('fa-solid');
            favoriteIcon.classList.add('fa-regular');
        }
    });

    return false;
};

bookmarkVideo = function() {
    // toggle bookmark state
    saveBookmark(currentVideo.id, !currentVideo.bookmarked).then(function(video) {
        currentVideo = video;

        // update the bookmark icon
        let bookmarkIcon = document.getElementById('bookmark-icon');
        if ( currentVideo.bookmarked ) {
            bookmarkIcon.classList.remove('fa-regular');
            bookmarkIcon.classList.add('fa-solid');
        } else {
            bookmarkIcon.classList.remove('fa-solid');
            bookmarkIcon.classList.add('fa-regular');
        }
    });
    
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


/* Animations on reactions buttons */

setButtonAnimationReaction = function(button, symbol) {

    button.addEventListener('click', () => {
        console.log("adding reaction");
        const reactionElement = document.createElement('span');
        reactionElement.classList.add('reaction', 'flow-reaction');
        reactionElement.innerHTML = symbol;
        button.appendChild(reactionElement);

        // Remove the heart after the animation is complete
        reactionElement.addEventListener('animationend', () => {
            console.log("reaction remove")
            reactionElement.remove();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setButtonAnimationReaction( document.getElementById('favorite-button'), '&#x2764;');
    setButtonAnimationReaction( document.getElementById('like-button'), '&#x1F44D;');
    setButtonAnimationReaction( document.getElementById('dislike-button'), '&#x1F44E;');
});