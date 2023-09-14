// Initialize var musicData by reading from JSON file
var musicData = {};
var bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.02;
if(bgMusic.volume == 0.02){
    console.log("volume set");
}else{
    console.log("not set");
}

(function ($) {
    "use strict";

    // Global variables for background music and button music
    var buttonAudio = document.getElementById("button-audio");
    var videoPlayer = document.getElementById("video-player");

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

    // Assigns music data to music list buttons
    function assignMusicDataToButtons() {
        var musicList = document.getElementById("music-list");

        // Sort the musicData
        var sortedDates = Object.keys(musicData).sort(function (a, b) {
            return new Date(b) - new Date(a);
        });

        sortedDates.forEach(function (date, index) {
            var musicInfo = musicData[date];
            var listItem = document.createElement("li");
            listItem.className = "music-list-item"; 

            var button = document.createElement("button");
            button.className = "music-button";
            button.textContent = index + 1 + ". " + musicInfo.title;
            button.setAttribute("data-source", musicInfo.source);
            button.setAttribute("data-video", musicInfo.video); // Add video source to button
            button.addEventListener("click", function () {
                var source = this.getAttribute("data-source");
                var videoSource = this.getAttribute("data-video"); // Get video source
                setButtonAndVideoSource(source, videoSource);
                playButton.textContent = "Play";
            });

            listItem.appendChild(button);
            musicList.appendChild(listItem); // Append <li> to the <ul>
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
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function () {
        if (playButton.textContent === "Play") {

            bgMusic.pause();

            buttonAudio.play();

            videoPlayer.play();

            playButton.textContent = "Pause";
        } else {

            buttonAudio.pause();

            videoPlayer.pause();

            playButton.textContent = "Play";

            bgMusic.play();
        }
    });

    // DOMContentLoaded event listener
    document.addEventListener('DOMContentLoaded', function () {


        // Load music data from the JSON file
        loadMusicData(function () {
            console.log(musicData);

            // Call the function to assign music data to buttons
            assignMusicDataToButtons();
        });

        // Trigger a click event on the first music button after a delay
        setTimeout(function () {
            var firstMusicButton = document.querySelector('.music-button');
            if (firstMusicButton) {
                console.log("first button clicked by aaron");
                firstMusicButton.click();
            }
        }, 500); // Delay for 0.5 second (otherwise the video may not be loaded)
    }, false);

})(jQuery);

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
// Sound button
document.addEventListener("DOMContentLoaded", function () {
    const soundControl = document.getElementById("sound-control");

    // Function to toggle sound mute/unmute for all audio elements
    function toggleSound() {
        const audioElements = document.querySelectorAll("audio");

        audioElements.forEach(function (audio) {
            if (audio.muted) {
                audio.muted = false;
            } else {
                audio.muted = true;
            }
        });

        // Toggle the text content of the sound control button
        if (audioElements[0].muted) {
            soundControl.textContent = "Sound: Off";
        } else {
            soundControl.textContent = "Sound: On";
        }
    }

    // Add click event listener to sound control button
    soundControl.addEventListener("click", toggleSound);
});

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
