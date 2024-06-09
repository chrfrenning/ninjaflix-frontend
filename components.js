var isExpanded = false;

function toggleSearch() {
    var input = document.querySelector('.search-input');

    if (isExpanded) {
        isExpanded = false;
        
        input.style.width = '0';
        input.style.opacity = '0';

        var dropdown = document.getElementById('search-dropdown');
        if ( dropdown ) {
            dropdown.parentElement.removeChild(dropdown);
        }

        
    } else {
        isExpanded = true;

        input.style.width = '150px'; // Set this width as needed
        input.style.opacity = '1';

        input.focus();
        
    }
}

addVideosToResultList = function(videos, listItemId = "video-list") {
    var videoList = document.getElementById(listItemId);
    videoList.innerHTML = '';

    for (var i = 0; i < videos.length; i++) {
        var video = videos[i];
        var videoItem = document.createElement('li');
        videoItem.title = video.title;
        videoList.append(videoItem);

        var videoLink = document.createElement('a');
        videoLink.href = "watch.html?id=" + video.id;
        videoItem.append(videoLink);

        var videoThumbnail = document.createElement('img');
        videoThumbnail.src = `${baseUrl}thumbnails/${video.id}.jpg`;

        var videoTitle = document.createElement('span');
        videoTitle.innerText = video.title;

        videoLink.append(videoThumbnail);
        videoLink.append(videoTitle);
    }
}

onSearchVideos = function() {
    var searchInput = document.getElementById('search-input');
    var query = searchInput.value;
    console.log('searching for: ' + query);

    searchVideos(query).then(function(videos) {
        var dropdown = document.getElementById('search-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'search-dropdown';
            
            searchInput.parentNode.appendChild(dropdown);
        }

        dropdown.innerHTML = '';

        if ( videos.length == 0 ) {
            var noResults = document.createElement('p');
            noResults.innerText = 'No results found';
            dropdown.appendChild(noResults);
            return;
        } else {
            var videoList = document.createElement('ul');
            videoList.id = 'search-result-list';
            dropdown.appendChild(videoList);

            addVideosToResultList(videos, 'search-result-list');
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        document.getElementById('search-input').addEventListener('input', onSearchVideos);
    });
});