import { map } from '../mapbox/index.js';





const toggleNav = () => {
    const sideNavBar = document.getElementById("sideNavBar");
    const closeNav = document.getElementById("closeNav");
    const openNav = document.getElementById("openNav");

    closeNav.addEventListener('click', () => { sideNavBar.classList.toggle("sideNavBar-active"); })
    openNav.addEventListener('click', () => { sideNavBar.classList.toggle("sideNavBar-active"); })
    document.getElementById('searchCourse-btn').addEventListener('click', () => { sideNavBar.classList.toggle("sideNavBar-active"); })

}


const toggleAccordion = () => {

    let accordions = document.getElementsByClassName("accordion");

    const toggleAccordionPanel = (accordion) => {
        accordion.classList.toggle("active");
        let panel = accordion.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
    };

    Array.from(accordions).forEach((accordion) => {
        accordion.addEventListener("click", () => toggleAccordionPanel(accordion));
    });
}



const toggleSortDropMenu = () => {
    const wrapper = document.querySelector(".sort-menu-container");
    wrapper.addEventListener("click", function (event) {
        event.stopPropagation();
        this.classList.toggle("open");
    });

    document.addEventListener("click", function () {
        wrapper.classList.remove("open");
    });
}

const toggleSearchMenu = () => {
    var searchMenuContainer = document.querySelector('.search-menu-container');
    var searchLayout = document.querySelector('.search-lyout');

    // Überprüfen, ob die display-Eigenschaft bereits 'block' ist
    if (searchMenuContainer.style.display === 'block') {
        // Zurücksetzen auf Standardwerte
        searchMenuContainer.style.display = 'none';
        searchLayout.style.right = '-100%';
    } else {
        // Ändern der Eigenschaften wie vorher beschrieben
        searchMenuContainer.style.display = 'block';
        searchLayout.style.right = '0px';
    }
};
document.getElementById('searchCourseBtn').addEventListener('click', toggleSearchMenu)
document.getElementById('openSearchMenu').addEventListener('click', toggleSearchMenu);
document.getElementById('closeSearchMenu').addEventListener('click', toggleSearchMenu);

const toggleSearchMenuMobile = () => {
    var searchMenuContainer = document.querySelector('.search-menu-containerMobile');
    var searchLayout = document.querySelector('.search-lyoutMobile');

    // Überprüfen, ob die display-Eigenschaft bereits 'block' ist
    if (searchMenuContainer.style.display === 'block') {
        // Zurücksetzen auf Standardwerte
        searchMenuContainer.style.display = 'none';
        searchLayout.style.right = '-100%';
    } else {
        // Ändern der Eigenschaften wie vorher beschrieben
        searchMenuContainer.style.display = 'block';
        searchLayout.style.right = '0px';
    }
};


document.getElementById('openSearchMenuMobile').addEventListener('click', toggleSearchMenuMobile);
document.getElementById('closeSearchMenuMobile').addEventListener('click', toggleSearchMenuMobile);


function setupUI(addresses) {
    toggleNav();
    toggleAccordion();
    toggleSortDropMenu();
    map(addresses);

}

export { setupUI }