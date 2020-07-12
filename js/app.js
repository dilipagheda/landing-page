/**
 * 
 * Udacity Project # 2
 * - programmatically builds navigation,
 * - scrolls to anchors from navigation,
 * - highlights section in viewport upon scrolling.
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
const NAVBAR_HEIGHT = 52; // height of the top nav bar in pixels
const NAVBAR_HEIGHT_MOBILE = 200; // height of the top nav bar in pixels

const APP_STATE = {
    current_active_sectionId: null,
    previous_active_sectionId: null,
    setActiveSection(sectionId) {
        //1. check for correctness and state change
        if (sectionId && typeof sectionId === 'string' && sectionId !== this.current_active_sectionId) {
            this.previous_active_sectionId = this.current_active_sectionId;
            this.current_active_sectionId = sectionId;

            //2. create and dispatch the event to update active section
            const updateActiveSectionEvent = new Event('update-active-section');
            document.dispatchEvent(updateActiveSectionEvent);
        }
    }
};

const ulElementOfNav = document.querySelector('nav.navbar__menu ul#navbar__list');
const sectionElements = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//helper function to determine the height of the nav bar depending on viewport width. i.e., mobile or desktop
function getNavBarHeight() {
    var x = window.matchMedia('(max-width: 767px)');

    return x.matches ? NAVBAR_HEIGHT_MOBILE : NAVBAR_HEIGHT;
}

//helper function to get active section
function getActiveSectionId(sectionList) {

    //1. check for empty list
    if (sectionList.length === 0) {
        return null;
    }

    //2. filter out all negetive top values
    sectionList = sectionList.filter(item => item.top > 0);

    //3. check for empty list
    if (sectionList.length === 0) {
        return null;
    }

    let minSection = sectionList[0];
    for (const sectionItem of sectionList) {
        if (sectionItem.top < minSection.top) {
            minSection = sectionItem;
        }
    }

    return minSection.id;
}

//helper function to build menu
function buildMenu() {
    const fragmentElement = document.createDocumentFragment();

    for (const sectionElement of sectionElements) {
        const sectionName = sectionElement.getAttribute('data-nav');
        const sectionId = sectionElement.getAttribute('id');
        const liElement = document.createElement('li');

        liElement.classList = 'menu__link';
        liElement.setAttribute('data-section-id', sectionId);
        liElement.textContent = sectionName;
        fragmentElement.appendChild(liElement);
    }

    ulElementOfNav.appendChild(fragmentElement);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build menu 
buildMenu();

// Scroll back to the top on fresh page load
const headingElement = document.querySelector('.landing__container h2');
const rect = headingElement.getBoundingClientRect();
window.scrollTo({
    top: rect.top - getNavBarHeight(),
    behavior: 'smooth'
});


//function to render active section based on APP_STATE
function onUpdateActiveSectionHandler() {
    //1. remove active class from previoulsy active section
    if (APP_STATE.previous_active_sectionId) {
        const previouslyActiveSectionElement = document.querySelector('section.active');
        if (previouslyActiveSectionElement) {
            previouslyActiveSectionElement.classList.remove('active');
        }

        const previouslyActiveMenuElement = document.querySelector(`#navbar__list .menu__link.active`);
        if (previouslyActiveMenuElement) {
            previouslyActiveMenuElement.classList.remove('active');
        }
    }

    //2. add active class to currently active section
    if (APP_STATE.current_active_sectionId) {
        const currentlyuActiveSectionElement = document.getElementById(APP_STATE.current_active_sectionId);
        currentlyuActiveSectionElement.classList.add('active');

        const currentlyActiveMenuElement = document.querySelector(`#navbar__list .menu__link[data-section-id=${APP_STATE.current_active_sectionId}]`);
        if (currentlyActiveMenuElement) {
            currentlyActiveMenuElement.classList.add('active');
        }
    }
}

//function to handle scroll event
function onScrollHandler(event) {
    const sectionList = [];

    //1. calculate top value for each section
    for (const sectionElement of sectionElements) {
        const sectionId = sectionElement.getAttribute('id');
        const headerElement = sectionElement.querySelector('h2');
        const rect = headerElement.getBoundingClientRect();

        sectionList.push({ id: sectionId, top: rect.top - getNavBarHeight() });
    }

    //2. retrieve active section
    const activeSectionId = getActiveSectionId(sectionList);

    //3. update the app state
    APP_STATE.setActiveSection(activeSectionId);
}

//function to handle click event
function onMenuClickHandler() {
    //1. check for the tagName
    if (event.target.tagName == 'LI') {
        //2. get the id of the section
        const sectionId = event.target.getAttribute('data-section-id');

        //3. scroll to the section header using smooth scroll
        const sectionElement = document.getElementById(sectionId);
        const rect = sectionElement.getBoundingClientRect();

        window.scrollTo({
            top: window.scrollY + rect.top - getNavBarHeight(),
            behavior: 'smooth'
        });
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('scroll', onScrollHandler);
ulElementOfNav.addEventListener('click', onMenuClickHandler);
document.addEventListener('update-active-section', onUpdateActiveSectionHandler);



