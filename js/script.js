// Initialize var musicData by reading from JSON file
var musicData = {};

(function ($) {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {
        // ...

        // Function to load music data from JSON file
        function loadMusicData(callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    musicData = JSON.parse(xhr.responseText);
                    callback();
                }
            };
            xhr.open('GET', 'musicData.json', true);
            xhr.send();
        }

        // Load music data from the JSON file
        loadMusicData(function () {
            // Now, musicData is populated with data from the JSON file
            // You can use it as before
            console.log(musicData);

            // Call the function to assign music data to buttons
            assignMusicDataToButtons();
        });

        // Function to assign music data to music list buttons
        function assignMusicDataToButtons() {
            var musicList = document.getElementById("music-list");

            // Sort the musicData by date in descending order (newest first)
            var sortedDates = Object.keys(musicData).sort(function (a, b) {
                return new Date(b) - new Date(a);
            });

            sortedDates.forEach(function (date, index) {
                var musicInfo = musicData[date];
                var listItem = document.createElement("li");
                listItem.className = "music-list-item"; // Set the class for <li>

                var button = document.createElement("button");
                button.className = "music-button";
                button.textContent = index + 1 + ". " + musicInfo.title;
                button.setAttribute("data-source", musicInfo.source);
                button.setAttribute("data-video", musicInfo.video); // Add video source to button
                button.addEventListener("click", function () {
                    var source = this.getAttribute("data-source");
                    var videoSource = this.getAttribute("data-video"); // Get video source
                    playMusicAndVideo(source, videoSource);
                });

                listItem.appendChild(button);
                musicList.appendChild(listItem); // Append <li> to the <ul>
            });
        }

        // Function to play music and video
        function playMusicAndVideo(musicSource, videoSource) {
            var audio = document.getElementById("bg-music");
            audio.src = musicSource;
            audio.play();

            var videoPlayer = document.getElementById("video-player");
            videoPlayer.src = videoSource;
            videoPlayer.play();
        }

        // ...

    }, false);
})(jQuery);



//*********************************************************************************************************/

//navbar collapse close
// Add a click event listener to the navbar toggler
document.addEventListener('DOMContentLoaded', function () {
    // Get all the navbar links
    var navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // Add click event listeners to the links
    navbarLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            // Check if the navigation menu is collapsed
            if (window.innerWidth <= 992) {
                // If it's collapsed, close it
                var navbarToggler = document.querySelector(".navbar-toggler");
                if (navbarToggler.classList.contains("collapsed")) {
                    // Check if the navbar is collapsed, if not, don't close it
                    return;
                }
                navbarToggler.click(); // Close the navbar
            }

            // Smooth scroll to the clicked section
            e.preventDefault();
            var targetId = link.getAttribute("href").substring(1); // Get the target section ID
            var targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});

//close the navbar when window become large
// Function to close the Bootstrap 4 navbar collapse when the window is resized to medium or larger
function closeNavbarOnResize() {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // Check if the window width is medium or larger (992 pixels or more)
    if (window.innerWidth >= 992 && !navbarToggler.classList.contains("collapsed")) {
        // Check if the navbar collapse is open
        if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click(); // Close the navbar collapse
        }
    }
}

// Add a resize event listener to close the navbar collapse on window resize
window.addEventListener('resize', closeNavbarOnResize);


//*********************************************************************************************************/

// Get the h1 element
const h1 = document.querySelector('h1');

// Function to increase font size and letter spacing on hover
function applyHoverEffect(event) {
    const letter = event.target;
    const isWhitespace = /\s/.test(letter.textContent); // Check if it's a whitespace character
    if (!isWhitespace) {
        letter.style.transition = 'font-size 0.2s ease-in-out'; // Shorter transition duration
        const originalSize = getComputedStyle(letter).fontSize;
        const newSize = `calc(${originalSize} + ${parseFloat(originalSize) * 0.8}px)`; // Increase the font size by 12%
        letter.style.fontSize = newSize;
        letter.style.letterSpacing = '-0.05em'; // Adjust the letter spacing to prevent spacing increase
    }
}

// Function to reset font size and letter spacing on mouseout
function resetHoverEffect(event) {
    const letter = event.target;
    letter.style.fontSize = ''; // Reset font size
    letter.style.letterSpacing = ''; // Reset letter spacing
}

// Wrap each letter in a span element and apply the hover effect
const text = h1.textContent;
const letters = text.split('');
const modifiedText = letters.map(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.addEventListener('mouseover', applyHoverEffect);
    span.addEventListener('mouseout', resetHoverEffect);
    return span;
});

// Replace the h1 content with the modified text
h1.textContent = '';
modifiedText.forEach(span => {
    h1.appendChild(span);
});

//*********************************************************************************************************/

//Lycris button
document.addEventListener("DOMContentLoaded", function () {
    const lyricsControl = document.getElementById("lyrics-button");

    // Function to toggle sound
    function togglelyrics() {
        if (lyricsControl.textContent == "Lyrics: Off") {
            lyricsControl.textContent = "Lyrics: On";
        } else {
            lyricsControl.textContent = "Lyrics: Off";
        }
    }

    // Add click event listener to sound control button
    lyricsControl.addEventListener("click", togglelyrics);
});


//*********************************************************************************************************/

//Sound button
document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById("bg-music");
    const soundControl = document.getElementById("sound-control");

    // Function to toggle sound
    function toggleSound() {
        if (bgMusic.paused) {
            bgMusic.play();
            soundControl.textContent = "Sound: On";
        } else {
            bgMusic.pause();
            soundControl.textContent = "Sound: Off";
        }
    }

    // Add click event listener to sound control button
    soundControl.addEventListener("click", toggleSound);
});

//*********************************************************************************************************/
// Listen for messages from calendar and paly music if sound on
window.addEventListener('message', function (event) {
    if (event.data.type === 'changeMusic') {
        // Change the background music source
        var bgMusic = document.getElementById('bg-music');
        bgMusic.src = event.data.source;
        bgMusic.load();
        // Check if sound is enabled
        var soundControl = document.getElementById('sound-control');
        var isSoundEnabled = soundControl.textContent.includes('Sound: On');
        if (isSoundEnabled) {
            bgMusic.play();
        }else{
            bgMusic.pause();
        }
    }
});

//*********************************************************************************************************/

document.addEventListener("DOMContentLoaded", function() {
    const hero = document.getElementById("hero-container");
    const navbarHeight = document.querySelector(".navbar").offsetHeight+200;

    window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate the opacity based on the scroll position
        const opacity = 1 - (scrollTop / navbarHeight);

        // Apply the opacity to the hero section
        hero.style.opacity = opacity < 0 ? 0 : opacity;
    });
});
//*********************************************************************************************************/
/* SCroll button */
document.addEventListener('DOMContentLoaded', function() {
    // Get the arrow element
    const scrollArrow = document.getElementById('scroll-arrow');

    // Get the rest section
    const restSection = document.getElementById('musicPlayer-container');

    // Add a click event listener to the arrow for smooth scrolling
    scrollArrow.addEventListener('click', function(event) {
        event.preventDefault();
        const offsetTop = restSection.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
        });
    });

    // Add a scroll event listener to toggle arrow visibility
    window.addEventListener('scroll', toggleArrowVisibility);

    // Initially hide the arrow when the page loads
    toggleArrowVisibility();
});

//*********************************************************************************************************/
