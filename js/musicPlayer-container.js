
// Initialize var musicData by reading from JSON file
var musicData = {};
var bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.02;

(function ($) {
    "use strict";

    var buttonAudio = document.getElementById("button-audio");
    var videoPlayer = document.getElementById("video-player");
    var playButton = document.getElementById("play-button");

    var currentMusicButton = null;

    // load music data from JSON
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

    // Assigns each button with data and event listener
    function assignMusicDataToButtons() {
        var musicList = document.getElementById("music-list");

        var sortedDates = Object.keys(musicData).sort(function (a, b) {
            return new Date(b) - new Date(a);
        });

        sortedDates.forEach(function (date, index) {
            var musicInfo = musicData[date];

            //create list item
            var listItem = document.createElement("li");
            listItem.className = "music-list-item";

            // Create a button element
            var button = document.createElement("button");
            button.className = "music-button";
            var indexWrapper = document.createElement("div");
            indexWrapper.className = "index-wrapper";
            indexWrapper.textContent = index + 1 + ".";
            var container = document.createElement("div"); // Container for textWrapper
            container.className = "text-container";
            var textWrapper = document.createElement("div");
            textWrapper.className = "button-text-wrapper";
            textWrapper.textContent = musicInfo.title;
            button.setAttribute("data-source", musicInfo.source);
            button.setAttribute("data-video", musicInfo.video);

            button.appendChild(indexWrapper);
            container.appendChild(textWrapper);
            button.appendChild(container);


            // Create play logo
            var playLogoContainer = document.createElement("div"); // Container for playLogo
            playLogoContainer.className = "play-logo-container";
            var playLogo = document.createElement("span");
            playLogo.className = "play-logo";
            playLogo.innerHTML = '<i class="fas fa-play"></i>';
            playLogoContainer.appendChild(playLogo);
            playLogo.style.display = "none";

            button.appendChild(playLogoContainer);

            //---------------------------------------------------------------------------------------
           
            window.addEventListener("resize", updateButtonContent);

            // update the button content based on screen width
            function updateButtonContent() {
                if (window.matchMedia("(max-width: 576px)").matches) {
                    if (playButton.textContent === "Play"  || playButton.innerHTML.trim() === '<i class="fas fa-play" aria-hidden="true"></i>') {
                        playButton.innerHTML = '<i class="fas fa-play"></i>'; // Set the play icon
                    }else{
                        playButton.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                } else {
                    if (playButton.textContent === "Play"  || playButton.innerHTML.trim() === '<i class="fas fa-play" aria-hidden="true"></i>') {
                        playButton.innerHTML = 'Play'; 
                    }else{
                        playButton.innerHTML = 'Pause';
                    }
                }
            }

            // music button click event
            button.addEventListener("click", function () {
                currentMusicButton.querySelector(".play-logo").innerHTML = '<i class="fas fa-play"></i>';
                var source = this.getAttribute("data-source");
                var videoSource = this.getAttribute("data-video");
                setButtonAndVideoSource(source, videoSource);

                // Check the initial screen width when the button is clicked
                updateButtonContent();

                currentMusicButton = this;
            });

            // Listen for screen width changes and update the button content
            
            //---------------------------------------------------------------------------------------
            // music button mouseover/mouseout event
           
            button.addEventListener("mouseover", function () {
                playLogo.style.display = "inline-block"; // Show the play logo on hover
            });
            button.addEventListener("mouseout", function () {
                playLogo.style.display = "none"; // Hide the play logo on mouseout
            });

            function updateButtonContent2(){
                if (window.matchMedia("(max-width: 576px)").matches) {
                    if (playButton.textContent === "Play"  || playButton.innerHTML.trim() === '<i class="fas fa-play" aria-hidden="true"></i>') {
                        playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Set the play icon
                    }else{
                        playButton.innerHTML = '<i class="fas fa-play"></i>';
                    }
                } else {
                    if (playButton.textContent === "Play"  || playButton.innerHTML.trim() === '<i class="fas fa-play" aria-hidden="true"></i>') {
                        playButton.innerHTML = 'Pause'; 
                    }else{
                        playButton.innerHTML = 'Play';
                    }
                }
            }

            // playlogo click event
            playLogo.addEventListener("click", function (event) {
                event.stopPropagation();
                var isPlayState = playLogo.innerHTML.includes("fa-pause");
                //if is playing
                if (isPlayState) {
                    buttonAudio.pause();
                    videoPlayer.pause();

                    bgMusic.play();

                    playLogo.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
                    updateButtonContent2();
                    
                } else {
                    // if starts another sound
                    if (currentMusicButton != button) {
                        currentMusicButton.click();

                        currentMusicButton = button;

                        currentMusicButton.click();
                    }
                    bgMusic.pause();
                    buttonAudio.play();
                    videoPlayer.play();

                    playLogo.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
                    updateButtonContent2();
                }
            });

            // Listen for the 'ended' event of buttonAudio to stop the video player
            buttonAudio.addEventListener("ended", function () {
                videoPlayer.pause();
            });

            listItem.appendChild(button);
            musicList.appendChild(listItem);
        });
    }

    // Function to set button music and video sources
    function setButtonAndVideoSource(musicSource, videoSource) {
        // Set the buttonAudio source to the clicked music
        buttonAudio.src = musicSource;

        // Set the video source
        videoPlayer.src = videoSource;
    }

    // Play button click event listener
    playButton.addEventListener("click", function () {
        currentMusicButton.querySelector(".play-logo").click();
    });

    // DOMContentLoaded event listener
    document.addEventListener('DOMContentLoaded', function () {

        // Load music data from the JSON file & apply animation
        loadMusicData(function () {
            console.log(musicData);
            assignMusicDataToButtons();

            // Check for overflow and apply animation
            var musicButtons = document.querySelectorAll(".music-button");
            musicButtons.forEach(function (button) {
                var container = button.querySelector(".text-container")
                var buttonText = container.querySelector(".button-text-wrapper");
                var playLogo = button.querySelector(".play-logo");
                var availableSpace = container.offsetWidth - playLogo.offsetWidth;
                if (buttonText.scrollWidth > container.offsetWidth) {
                    console.log("buttonText's width: " + buttonText.scrollWidth + ", avalible space: " + availableSpace);
                    console.log(buttonText.innerHTML + " scrolling");
                    buttonText.classList.add("scrollText");
                }
            });
        });

        // Trigger a click event on the first music button after a delay
        setTimeout(function () {
            var firstMusicButton = document.querySelector('.music-button');
            if (firstMusicButton) {
                console.log("first button clicked by aaron");
                currentMusicButton = firstMusicButton;
                firstMusicButton.click();
            }
        }, 500); // Delay for 0.5 seconds (otherwise the video may not be loaded)
    }, false);

})(jQuery);



//*********************************************************************************************************/

// Listen for messages from calendar and paly music if sound on
window.addEventListener('message', function (event) {
    if (event.data.type === 'changeMusic') {
        // Find the button with the same source and trigger a click event
        var musicButtons = document.querySelectorAll('.music-button');
        for (var i = 0; i < musicButtons.length; i++) {
            if (musicButtons[i].getAttribute('data-source') === event.data.source) {
                musicButtons[i].click(); // Trigger a click event on the button
                break; // Stop iterating once the matching button is found
            }
        }
    }
});

//*********************************************************************************************************/

// Playmode button
document.addEventListener("DOMContentLoaded", function () {
    const playControl = document.getElementById("play-mode");
    const playModeIcons = ["fas fa-random", "fas fa-sort-numeric-up", "fas fa-redo"];
    let currentModeIndex = 0;

    // Function to toggle between play modes and update the button's icon
    function togglePlayMode() {
        currentModeIndex = (currentModeIndex + 1) % playModeIcons.length;
        const currentModeIcon = playModeIcons[currentModeIndex];

        // Update the data attribute to store the current play mode icon class
        playControl.setAttribute("data-play-mode", currentModeIcon);

        // Update the button's icon based on the current play mode
        playControl.innerHTML = `<i class="${currentModeIcon}"></i>`;

        // You can also add logic here to handle the actual play mode behavior
        switch (currentModeIcon) {
            case "fas fa-random":
                // Handle "play randomly" mode
                break;
            case "fas fa-sort-numeric-up":
                // Handle "play in order" mode
                break;
            case "fas fa-redo":
                // Handle "loop" mode
                break;
        }
    }

    // Add a click event listener to toggle play modes
    playControl.addEventListener("click", togglePlayMode);
});

//*********************************************************************************************************/

// footer volume control
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the necessary elements
    var buttonAudio = document.getElementById("button-audio");
    var volumeControl = document.getElementById("volume-control");

    // Add an event listener to the volume control input
    volumeControl.addEventListener("input", function () {
        var volumeValue = parseFloat(volumeControl.value);

        buttonAudio.volume = volumeValue;
    });
});
//*********************************************************************************************************/

// Get the volume control input element
var volumeControl = document.getElementById("volume-control");

// Get the cat container
var catContainer = document.getElementById("cat-container");

// Get the cat image
var cat = document.getElementById("cat");

// Add an event listener to the volume control input
volumeControl.addEventListener("input", function () {
    // Get the current volume value from the input
    var volumeValue = parseFloat(volumeControl.value);

    // Calculate the thumb position as a percentage
    var thumbPosition = (volumeValue * 100) + '%';

    // Update the cat's position to follow the thumb
    cat.style.transform = `translateX(${thumbPosition})`;

    // Show or hide the cat based on the volume value
    if (volumeValue > 0) {
        catContainer.style.opacity = 1;
    } else {
        catContainer.style.opacity = 0;
    }
});
