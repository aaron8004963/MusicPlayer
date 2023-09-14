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

/* SCroll button */
document.addEventListener('DOMContentLoaded', function () {
    // Get the arrow element
    const scrollArrow = document.getElementById('scroll-arrow');

    // Get the rest section
    const restSection = document.getElementById('musicPlayer-container');

    // Add a click event listener to the arrow for smooth scrolling
    scrollArrow.addEventListener('click', function (event) {
        event.preventDefault();
        const offsetTop = restSection.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
        });
    });
});

//*********************************************************************************************************/

/* fading hero container */
document.addEventListener("DOMContentLoaded", function () {
    const hero = document.getElementById("hero-container");
    const navbarHeight = document.querySelector(".navbar").offsetHeight + 200;

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Calculate the opacity based on the scroll position
        const opacity = 1 - (scrollTop / navbarHeight);

        // Apply the opacity to the hero section
        hero.style.opacity = opacity < 0 ? 0 : opacity;
    });
});