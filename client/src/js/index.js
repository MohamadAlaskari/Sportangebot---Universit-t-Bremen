import { loadKurseData } from "./modules/data.js";
import { getMaxMinPrice } from "./modules/utils/utils.js";
import { setupUI } from "./modules/setupUI/setupUI.js";
import { updateFiltersOnChange, filterKurse ,updateSelectedAddresses} from "./modules/filters.js";
import { sortKurse, getSelectedSortValue } from "./modules/sort.js";
import { renderCourses } from "./modules/courseCard.js";
import { map } from "./modules/mapbox/mapIndex.js";
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

        
        updateSelectedAddresses(addresses(courses))
        updateFiltersOnChange((newFilters) => {
            currentFilters = newFilters;
            updateCourses(courses);
        });


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


// Rendern der Kurskarten

init();
