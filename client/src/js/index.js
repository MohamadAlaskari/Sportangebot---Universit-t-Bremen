import { setupUI } from "./modules/setupUI/setupUI.js";
import { currentSortOption, sortKurse } from "./modules/sort.js";
import { updateFiltersOnChange } from "./modules/filters.js";
import { loadKurseData } from "./modules/data.js";
import { filterKurse } from "./modules/filters.js";
import { createCourseCard } from "./modules/setupUI/setupCourseCard.js";

let currentFilters = {};
let currentSortValue = "";

async function init() {
    try {
        const kurse = await loadKurseData();
        console.log('Geladene Kursdaten: ', kurse);

        setupUI();
       // setupSortListener(); // Funktion zum Einrichten des Sortier-Listeners

        updateCourses(kurse);

        updateFiltersOnChange((newFilters) => {
            currentFilters = newFilters;
            updateCourses(kurse);
        });

    } catch (error) {
        console.error("Fehler beim Initialisieren der Anwendung:", error);
    }
}

// Einrichten des Sortier-Listeners
function setupSortListener() {
    const sortDropdown = document.querySelector(".sortDropdown");
    sortDropdown.addEventListener("change", () => {
        currentSortValue = currentSortOption(); // Aktualisiere die aktuelle Sortieroption
        updateCourses(kurse); // Aktualisiere und rendere die Kurse basierend auf der neuen Sortierung
    });
}

// Hilfsfunktion zum Filtern, Sortieren und Rendern der Kurse
function updateCourses(kurse) {
    let gefilterteKurse = filterKurse(kurse, currentFilters);
   // let sortedKurse = sortKurse(gefilterteKurse, currentSortValue);
    renderCourses(gefilterteKurse);
}

// Rendern der Kurskarten
function renderCourses(courses) {
    const coursesContainer = document.querySelector(".coursecards-container");
    coursesContainer.innerHTML = "";

    if (courses.length === 0) {
        coursesContainer.innerHTML = '<h5 class="no-courses-message">Keine Kurse gefunden.</h5>';
    } else {
        courses.forEach((kurs) => {
            const courseCard = createCourseCard(kurs);
            coursesContainer.innerHTML += courseCard;
        });
    }
}

init();
