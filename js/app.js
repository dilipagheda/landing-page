/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
let ulElementOfNav = document.querySelector('nav.navbar__menu ul#navbar__list');
let sectionElements = document.querySelectorAll('section');

let fragmentElement = document.createDocumentFragment();

for (const sectionElement of sectionElements) {
    const sectionName = sectionElement.getAttribute('data-nav');

    const liElement = document.createElement('li');
    liElement.classList = 'menu__link';
    liElement.textContent = sectionName;
    fragmentElement.appendChild(liElement);
}

ulElementOfNav.appendChild(fragmentElement);



// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


