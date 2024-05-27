/* Globals */

let databaseUrl = "/database.json";
let baseUrl = "https://chphno.blob.core.windows.net/ninjaflix/";
let videos = [];
let latencySimulation = 100;



/* 
 * Support for like, dislike, and favorite
 *
 * Using localStorage for state per user
 * Simulating backend with a delay
 * Using promises to enable future proper api calls
 */

addLike = function(id) {
    return new Promise((resolve, reject) => {
        getVideoInfo(id).then(function(video) {
            // delay to simulate backend
            setTimeout(function() {
                video.likes++;
                saveVideoStateToLocalStorage(video);
                resolve(video);
            }, latencySimulation);
        });
    });
}

addDislike = function(id) {
    return new Promise((resolve, reject) => {
        getVideoInfo(id).then(function(video) {
            // delay to simulate backend
            setTimeout(function() {
                video.dislikes++;
                saveVideoStateToLocalStorage(video);
                resolve(video);
            }, latencySimulation);
        });
    });
}

saveFavorite = function(id, favoriteFlag) {
    return new Promise((resolve, reject) => {
        getVideoInfo(id).then(function(video) {
            // delay to simulate backend
            setTimeout(function() {
                video.favorite = favoriteFlag;
                saveVideoStateToLocalStorage(video);
                resolve(video);
            }, latencySimulation);
        });
    });
}

saveBookmark = function(id, bookmarkFlag) {
    return new Promise((resolve, reject) => {
        getVideoInfo(id).then(function(video) {
            // delay to simulate backend
            setTimeout(function() {
                video.bookmarked = bookmarkFlag;
                saveVideoStateToLocalStorage(video);
                resolve(video);
            }, latencySimulation);
        });
    });
}

saveVideoStateToLocalStorage = function(video) {
    localStorage.setItem(`video-${video.id}`, JSON.stringify(video));
}

loadVideoStateFromLocalStorage = function(id) {
    return JSON.parse(localStorage.getItem(`video-${id}`));
}

mergeWithLocalStorage = function(videos) {
    for (var i = 0; i < videos.length; i++) {
        let video = loadVideoStateFromLocalStorage(videos[i].id);
        if (video) {
            videos[i].likes = video.likes;
            videos[i].dislikes = video.dislikes;
            videos[i].favorite = video.favorite;
            videos[i].bookmarked = video.bookmarked;
        }
    }
}

/* 
 * Loading and searching for videos from the backend
 *
 * Videos stored in the cloud
 * The list of videos is local file database.json
 * Ready for proper backend with promises
 * 
 */

init = function() {
    return new Promise((resolve, reject) => {
        fetch(databaseUrl)
            .then(response => response.json())
            .then(data => {
                videos = data.videos;

                initExtendedVideoProperties(videos);
                mergeWithLocalStorage(videos);

                resolve();
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

initExtendedVideoProperties = function(videos) {
    videos.forEach( video => {
        video.likes = 0;
        video.dislikes = 0;
        video.favorite = false;
        video.bookmarked = false;
    });
}

getVideoInfo = function(id) {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < videos.length; i++) {
            if (videos[i].id == id) {
                resolve(videos[i]);
            }
        }
        reject(new Error('Video not found'));
    });
}

listVideos = function() {
    return new Promise((resolve, reject) => {
        if (videos.length == 0) {
            init().then(function() {
                resolve(videos);
            });
        } else {
            resolve(videos);
        }
    });
}

searchVideos = function(query) {
    return new Promise((resolve, reject) => {
        listVideos().then(function(videos) {
            let results = videos.filter(video => video.title.toLowerCase().includes(query.toLowerCase()));
            resolve(results);
        });
    });
}

listFavoriteVideos = function() {
    return new Promise((resolve, reject) => {
        listVideos().then(function(videos) {
            let results = videos.filter(video => video.favorite);
            let firstFive = results.slice(0, 3);
            resolve(firstFive);
        });
    });
}

listBookmarkedVideos = function() {
    return new Promise((resolve, reject) => {
        listVideos().then(function(videos) {
            let results = videos.filter(video => video.bookmarked);
            let firstFive = results.slice(0, 3);
            resolve(firstFive);
        });
    });
}

listRecommendedVideos = function(id) {
    return new Promise((resolve, reject) => {
        getVideoInfo(id).then(function(video) {
            listVideos().then(function(videos) {
                let results = videos.filter(v => v.id != id && v.genre === video.genre);
                let randomVideos = results.sort(() => 0.5 - Math.random()).slice(0, 3);
                resolve(randomVideos);
            });
        });
    });
}