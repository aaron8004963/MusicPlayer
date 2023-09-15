
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
                   var indexBox = document.createElement("div");
                   indexBox.className = "index-wrapper";
                   indexBox.textContent = index + 1 + ".";
                   var textBox = document.createElement("div");
                   textBox.className = "button-textBox";
                   textBox.textContent = musicInfo.title;
                   button.setAttribute("data-source", musicInfo.source);
                   button.setAttribute("data-video", musicInfo.video);
                   button.appendChild(indexBox);
                   button.appendChild(textBox);

                   // Create play logo
                   var playLogo = document.createElement("span");
                   playLogo.className = "play-logo";
                   playLogo.innerHTML = '<i class="fas fa-play"></i>';
                   button.appendChild(playLogo);
                   playLogo.style.display = "none";

                   // music button click event
                   button.addEventListener("click", function () {

                       currentMusicButton.querySelector(".play-logo").innerHTML = '<i class="fas fa-play"></i>';

                       var source = this.getAttribute("data-source");
                       var videoSource = this.getAttribute("data-video");
                       setButtonAndVideoSource(source, videoSource);
                       playButton.textContent = "Play";

                       currentMusicButton = this;
                   });

                   // music button mouseover/mouseout event
                   button.addEventListener("mouseover", function () {
                       playLogo.style.display = "inline-block"; // Show the play logo on hover
                   });
                   button.addEventListener("mouseout", function () {
                       playLogo.style.display = "none"; // Hide the play logo on mouseout
                   });

                   // playlogo click event
                   playLogo.addEventListener("click", function (event) {
                       event.stopPropagation();
                       var isPlayState = playLogo.innerHTML.includes("fa-pause");
                       //if is playing
                       if (isPlayState) {
                           buttonAudio.pause();
                           videoPlayer.pause();

                           bgMusic.play();

                           playButton.textContent = "Play";
                           playLogo.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
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

                           playButton.textContent = "Pause";
                           playLogo.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
                       }
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
               if (playButton.textContent === "Play") {
                   // Check if there's a current music button and its play logo
                   if (currentMusicButton) {
                       // Simulate a click on the current music button's play logo
                       currentMusicButton.querySelector(".play-logo").click();
                   }
               } else {
                   currentMusicButton.querySelector(".play-logo").click();

               }
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
                       var buttonText = button.querySelector(".button-textBox");
                       var playLogo = button.querySelector(".play-logo");
                       var availableSpace = button.offsetWidth - playLogo.offsetWidth;
                       if (buttonText.scrollWidth > availableSpace) {
                            console.log("buttonText's width: " + buttonText.scrollWidth + ", avalible spave: " + availableSpace);
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

