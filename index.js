/* requires common.js */

document.addEventListener("DOMContentLoaded", function() {
    init().then(function() {
        listVideos().then(function(videos) {
            addVideosToList(videos);
        });
    });
    
    showSlides(slideIndex);
    setInterval(autoSlide, 5000);
});

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

/*
 *
 * Featured films
 *
 * */

let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;

  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].classList.add("active");
}

function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
}