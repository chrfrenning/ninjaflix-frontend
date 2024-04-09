let databaseUrl = "/database.json";
let baseUrl = "https://chphno.blob.core.windows.net/ninjaflix/";
let videos = [];

init = function() {
    return new Promise((resolve, reject) => {
        fetch(databaseUrl)
            .then(response => response.json())
            .then(data => {
                videos = data.videos;
                resolve();
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}