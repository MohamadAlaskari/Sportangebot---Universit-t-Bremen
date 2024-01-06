


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

/************
 +++++ Price Methodes
 **************/
function syncPriceValues(minInput, minRange, maxInput, maxRange) {
    function adjustValues() {
        let minValue = parseInt(minInput.value, 10);
        let maxValue = parseInt(maxInput.value, 10);
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
    // Retrieve price input fields and sliders from the DOM
    const inputMin = document.querySelector(".input-min");
    const inputMax = document.querySelector(".input-max");
    const rangeMin = document.querySelector(".range-min");
    const rangeMax = document.querySelector(".range-max");

    // Check if all elements are present
    if (inputMin && inputMax && rangeMin && rangeMax) {
        // Set values and limits for the input fields and sliders
        inputMin.value = rangeMin.value = minPrice;
        inputMax.value = rangeMax.value = maxPrice;

        // Set the input fields to readonly to prevent the user from typing in them
        inputMin.setAttribute('readonly', true);
        inputMax.setAttribute('readonly', true);

        // Set minimum and maximum values for the sliders to define the range
        rangeMin.min = minPrice;
        rangeMin.max = maxPrice;
        rangeMax.min = minPrice;
        rangeMax.max = maxPrice;

        // Call the synchronization function for the price values
        syncPriceValues(inputMin, rangeMin, inputMax, rangeMax);
    }
}

// scrollToTop

function updateButtonClassOnScroll() {
    const button = document.getElementById('scrollBtn');

    if (window.pageYOffset > 1000) {
        // Benutzer hat weiter als 100 Pixel nach unten gescrollt
        button.classList.add('up');
        button.classList.remove('down');
    } else {
        // Benutzer ist nahe am oberen Rand der Seite
        button.classList.add('down');
        button.classList.remove('up');
    }
}

// Event-Listener für das Scrollen, um die Button-Klassen zu aktualisieren
window.addEventListener('scroll', updateButtonClassOnScroll);

// Event-Listener für den Button, um nach oben oder unten zu scrollen
document.getElementById('scrollBtn').addEventListener('click', () => {
    if (window.pageYOffset > 1000) {
        // Scrollen Sie zur Oberseite der Seite
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Scrollen Sie zum unteren Ende der Seite
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
});



function setupUI( [minPrice, maxPrice]) {
    toggleNav();
    toggleAccordion();
    toggleSortDropMenu();
  

    setupPrice(minPrice, maxPrice);
}

export { setupUI };