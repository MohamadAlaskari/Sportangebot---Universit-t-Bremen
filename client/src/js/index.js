import { loadKurseData } from "./modules/data.js";
import { getMaxMinPrice } from "./modules/utils/utils.js";
import { setupUI } from "./modules/setupUI/setupUI.js";
import { updateFiltersOnChange, filterKurse, updateSelectedAddresses } from "./modules/filters.js";
import { sortKurse, getSelectedSortValue } from "./modules/sort.js";
import { renderCourses } from "./modules/courseCard.js";
import { map, currentMapAddresses } from "./modules/mapbox/mapIndex.js";
import { searchCourse } from "./modules/search_course.js";



let currentFilters = {};
let currentSortValue = "";

async function init() {
    try {
        const data = await loadKurseData();
        const courses = data.courses;


        console.log('Geladene courses: ', courses);

        setupUI(getMaxMinPrice(courses));
        map(addresses(courses));

        setupSortListener(courses); // Funktion zum Einrichten des Sortier-Listeners
        console.log('currentMapAddresses von indexjs vor updateFiltersOnChange: ', currentMapAddresses)
        updateFiltersOnChange((newFilters) => {
            console.log('currentMapAddresses von indexjs nach updateFiltersOnChange:: ', currentMapAddresses)
            currentFilters = { ...currentFilters, ...newFilters };
            updateFilterCountDisplay(currentFilters)
            updateCourses(courses);
        }, currentMapAddresses);




        // Select all search buttons
        const searchButtons = document.querySelectorAll('.searchCourseBtn');

        searchButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Find the search input within the same container
                const searchContainer = this.parentElement;
                const searchInput = searchContainer.querySelector('.searchCourseInput');
                const searchQuery = searchInput.value.trim();

                // Perform the search and render the results
                const foundCourses = searchCourse(courses, searchQuery);
                renderCourses(foundCourses);

                // clear the input field
                searchInput.value = '';

                console.log('Search Query: ', searchQuery);
                console.log('foundCourses: ', foundCourses);

            });
        });




    } catch (error) {
        console.error("Fehler beim Initialisieren der Anwendung:", error);
    }
}

// Einrichten des Sortier-Listeners
function setupSortListener(courses) {
    const sortDropdown = document.querySelector(".sortDropdown");
    sortDropdown.addEventListener("change", () => {
        currentSortValue = getSelectedSortValue(); // Aktualisiere die aktuelle Sortieroption
        updateCourses(courses); // Aktualisiere und rendere die Kurse basierend auf der neuen Sortierung
    });
}

// Hilfsfunktion zum Filtern, Sortieren und Rendern der Kurse
function updateCourses(courses) {
    let gefilterteKurse = filterKurse(courses, currentFilters);
    let sortedKurse = sortKurse(gefilterteKurse, currentSortValue);
    anzahl(courses, gefilterteKurse)
    renderCourses(sortedKurse);

    //consol.log
    console.log('currentFilters: ', currentFilters)
    console.log('gefilterteKurse: ', gefilterteKurse)
    console.log('currentSortValue: ', currentSortValue)
    console.log('sortedKurse: ', sortedKurse)

}


const addresses = (courses) => {
    const addresses = [];
    courses.forEach(course => {
        if (course.address) { // Sicherstellen, dass das Kursobjekt eine Adresse hat
            addresses.push(course.address);
        }
    });
    return addresses;
};

//filter btn bla bla 
function updateFilterCountDisplay(currentFilters) {
    const filterActiveElement = document.getElementById('filterActive');

    let activeFilterCount = 0;
    Object.keys(currentFilters).forEach(key => {
        if (key === 'price') {
            // Zählt separat für Mindest- und Höchstpreis, wenn sie von den Standardwerten abweichen
            const { min, max } = currentFilters[key];
            if (min && min !== '10') {
                activeFilterCount += 1;
            }
            if (max && max !== '100') {
                activeFilterCount += 1;
            }
        } else if (Array.isArray(currentFilters[key]) && currentFilters[key].length > 0) {
            // Zählt die aktiven Filter in anderen Kategorien
            activeFilterCount += currentFilters[key].length;
        }
    });

    // Aktualisierung des Anzeigeelements
    if (activeFilterCount > 0) {
        filterActiveElement.classList.remove('empty');
        filterActiveElement.textContent = `${activeFilterCount}`;
    } else {
        filterActiveElement.classList.add('empty');
        filterActiveElement.textContent = '0';
    }
}

function anzahl(courses, gefilterteKurse) {
    const anzahl = document.getElementById('anzahl');
    anzahl.innerHTML = `${gefilterteKurse.length} von ${courses.length} Angeboten gefunden`; 

}
// Rendern der Kurskarten

init();
