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