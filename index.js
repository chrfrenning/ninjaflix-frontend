/* requires common.js */

document.addEventListener("DOMContentLoaded", function() {
    init().then(function() {

        listVideos().then(function(videos) {
            // filter the list of videos to show only the ones that have attribute new=true
            newVideos = videos.filter(video => video.new === true);
            addVideosToScrollContainer(newVideos, document.getElementById("new-scroller"));

            recommendedVideos = videos.filter(video => video.recommended === true);
            addVideosToScrollContainer(recommendedVideos, document.getElementById("recommended-scroller"));

            featuredVideos = videos.filter(video => video.featured === true);
            addVideosToFeaturedSlides(featuredVideos);
            showSlides(slideIndex);
            setInterval(autoSlide, 5000);
        });

        listBookmarkedVideos().then(function(videos) {
          addVideosToScrollContainer(videos, document.getElementById("later-scroller"));
        });

        listFavoriteVideos().then(function(videos) {
          addVideosToScrollContainer(videos, document.getElementById("fav-scroller"));
        });
    });
});

addVideosToScrollContainer = function(videos, list) {
  list.innerHTML = '';

  for (var i = 0; i < videos.length; i++) {
    var video = videos[i];

    var videoItem = document.createElement('li');

    videoItem.className = 'video-list-item';

    var videoLink = document.createElement('a');
    videoLink.href = 'watch.html?id=' + video.id;
    videoLink.ariaLabel = video.title;
    videoItem.append(videoLink);

    var videoThumbnail = document.createElement('img');
    videoThumbnail.src = `${baseUrl}thumbnails/${video.id}.jpg`;
    videoLink.append(videoThumbnail);

    var title = video.title;
    if (title.length > 20) {
      title = title.substring(0, 20) + '...';
    }

    var videoTitle = document.createElement('p');
    videoTitle.innerText = title;
    videoTitle.title = video.title;
    videoLink.append(videoTitle);

    list.append(videoItem);
  }}

addVideosToFeaturedSlides = function(videos) {
  container = document.getElementById("feature-new");
  dots = document.getElementById("dots");
  container.innerHTML = '';

  for (var i = 0; i < videos.length; i++) {
    var video = videos[i];

    var slide = document.createElement('div');
    slide.className = 'mySlides fade';
    if ( i == 0 )
      slide.className += ' active';
    slide.style.backgroundImage = `url(${baseUrl}thumbnails/${video.id}.jpg)`;

    var slideTextContainer = document.createElement('div');
    slideTextContainer.className = 'overlay-text';
    slide.append(slideTextContainer);

    var slideText = document.createElement('h4');
    slideText.innerText = video.title;
    slideTextContainer.append(slideText);

    container.append(slide);

    // create a dot
    var dot = document.createElement('span');
    dot.className = 'dot';
    dot.onclick = (function(i) {
      return function() {
        currentSlide(i);
      };
    })(i);
    dots.append(dot);
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