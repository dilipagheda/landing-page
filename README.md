# Landing Page Project

## About the project

This project is about building an interactive landing page using HTML, CSS and JavaScript.

It has primariliy following key features achieved through plain JavaScript.
  - Programmatically builds navigation based on number of sections
  - Scrolls to anchors from navigation using smooth scroll animation
  - Highlights section in viewport upon scrolling using css animation
  - Highlights the menu option for the section currently in viewport

## Technology used

- HTML, CSS and plain JavaScript :satisfied:

## Optimisation

Optimisation for DOM updates is achieved using conditional rendering and custom events. For example, when user scrolls, scroll handler calculates which section is on the viewport and then updates the application state. Inside, application state function a decision is taken whether to request for DOM update or not.

### Application state object

Application state looks like below where it keeps track of what is currently active section, previsouly active section and a function that will update the state and request DOM update via `updateActiveSectionEvent` if a condition is met for it.

Note: It is important to set state via `setActiveSection` function only else DOM render will not trigger. (kind of like React! :smiley:)

```
const APP_STATE = {
    current_active_sectionId: null,
    previous_active_sectionId: null,
    setActiveSection(sectionId) {
        //1. check for correctness
        if(sectionId && typeof sectionId === 'string') {
            //2. check if the state changed
            if(sectionId !== this.current_active_sectionId) {
                this.previous_active_sectionId = this.current_active_sectionId;
                this.current_active_sectionId = sectionId;

                //create and dispatch the event to update active section
                const updateActiveSectionEvent = new Event('update-active-section');
                document.dispatchEvent(updateActiveSectionEvent);
            }
        }
    }
};

```

Also, in order to minimise `run-to-completion` code and thus blocking the single thread, custom events are used to modularise code and to use JavaScript's asynchrnous nature such as event queue.

## How to run locally
- install a npm package `live-server` on your machine.
- clone this repo and download on your machine
- install VS CODE
- add this repo to VS CODE
- open terminal in VS CODE
- type `live-server`
- Now, project can be run in your browser using localhost.

## Screenshots
![](https://github.com/dilipagheda/landing-page/blob/master/screenshots/1.png)

