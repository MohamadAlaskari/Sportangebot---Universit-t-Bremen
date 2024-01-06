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

document.getElementById('searchCourseBtn').addEventListener('click', toggleSearchMenu);
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


function syncPriceValues(minInput, minRange, maxInput, maxRange) {
    function adjustValues() {
        let minValue = parseInt(minInput.value, 10);
        let maxValue = parseInt(maxInput.value,10);
        const MIN_MAX_DIFFERENCE = 5;


        if (maxValue - minValue < MIN_MAX_DIFFERENCE) {
            if (maxValue - MIN_MAX_DIFFERENCE >= minRange.min) {
                minValue = maxValue - MIN_MAX_DIFFERENCE;
            } else if (minValue + MIN_MAX_DIFFERENCE <= maxRange.max) {
                maxValue = minValue + MIN_MAX_DIFFERENCE;
            }
            minInput.value = minRange.value = minValue;
            maxInput.value = maxRange.value = maxValue;
        }
        updateSliderProgress(minInput, maxInput, minRange, maxRange);

    }


    minInput.addEventListener('input', () => {
        minRange.value = minInput.value;
        adjustValues();
    });

    minRange.addEventListener('input', () => {
        minInput.value = minRange.value;
        adjustValues();
    });

    maxInput.addEventListener('input', () => {
        maxRange.value = maxInput.value;
        adjustValues();
    });

    maxRange.addEventListener('input', () => {
        maxInput.value = maxRange.value;
        adjustValues();
    });


}

function updateSliderProgress(minInput, maxInput, minRange, maxRange) {
    const progressElement = document.querySelector('.slider .progress');
    if (progressElement) {
        const minPercent = ((parseInt(minInput.value, 10) - parseInt(minRange.min, 10)) /
                            (parseInt(minRange.max, 10) - parseInt(minRange.min, 10))) * 100;
        const maxPercent = ((parseInt(maxInput.value, 10) - parseInt(minRange.min, 10)) /
                            (parseInt(maxRange.max, 10) - parseInt(minRange.min, 10))) * 100;

        progressElement.style.left = `${minPercent}%`;
        progressElement.style.width = `${maxPercent - minPercent}%`;
    }
}



function setupPrice(minPrice, maxPrice) {

    const inputMin = document.querySelector(".input-min");
    const inputMax = document.querySelector(".input-max");
    const rangeMin = document.querySelector(".range-min");
    const rangeMax = document.querySelector(".range-max");
    
// Überprüfen, ob alle Elemente vorhanden sind
    if (inputMin && inputMax && rangeMin && rangeMax) {
        inputMin.value = rangeMin.value = minPrice;
        inputMax.value = rangeMax.value = maxPrice;

        rangeMin.min = minPrice;
        rangeMin.max = maxPrice;
        rangeMax.min = minPrice;
        rangeMax.max = maxPrice;

        syncPriceValues(inputMin, rangeMin, inputMax, rangeMax);
    }
}

function setupUI(addresses, [minPrice, maxPrice]) {
    toggleNav();
    toggleAccordion();
    toggleSortDropMenu();
    map(addresses);

    setupPrice(minPrice, maxPrice);
}

export { setupUI };