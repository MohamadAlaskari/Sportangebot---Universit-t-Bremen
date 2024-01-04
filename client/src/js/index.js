import { loadKurseData } from "./modules/data.js";
import { setupUI } from "./modules/setupUI/setupUI.js";
import { sortKurse, getSelectedSortValue } from "./modules/sort.js";
import { updateFiltersOnChange } from "./modules/filters.js";
import { filterKurse } from "./modules/filters.js";
import { renderCourses } from "./modules/setupUI/setupCourseCard.js";

let currentFilters = {};
let currentSortValue = "";

async function init() {
    try {
        const data = await loadKurseData();
        const courses = data.kurse;
        console.log('Geladene courses: ', courses);
        setupUI();

        setupSortListener(courses); // Funktion zum Einrichten des Sortier-Listeners

        updateFiltersOnChange((newFilters) => {
            currentFilters = newFilters;
            updateCourses(courses);
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

// Rendern der Kurskarten

init();
