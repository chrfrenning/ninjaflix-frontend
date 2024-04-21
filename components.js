function toggleSearch() {
    var input = document.querySelector('.search-input');
    var isExpanded = input.style.width !== '0px';
    if (isExpanded) {
        input.style.width = '0';
        input.style.opacity = '0';
    } else {
        input.style.width = '150px'; // Set this width as needed
        input.style.opacity = '1';
    }
}

onSearchVideos = function() {
    var searchInput = document.getElementById('search-input');
    var query = searchInput.value;

    searchVideos(query).then(function(videos) {
        addVideosToList(videos);
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