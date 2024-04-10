/* Globals */

let databaseUrl = "/database.json";
let baseUrl = "https://chphno.blob.core.windows.net/ninjaflix/";
let videos = [];
let latencySimulation = 500;



/* 
 * Support for like, dislike, and favorite
 *
 * Using localStorage for state per user
 * Simulating backend with a delay
 * Using promises to enable future proper api calls
 */

saveFavLikeDisState = function(id, favorite, like, dislike) {
    console.log("likedisfav");
    return new Promise((resolve, reject) => {
        getVideoInfo(id).then(function(video) {
            // delay to simulate backend
            setTimeout(function() {
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
            videos[i] = Object.assign(videos[i], video);
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

