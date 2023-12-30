import { setupUI } from "./modules/setupUI/setupUI.js";
import { sort } from "./modules/sort.js";
import { updateFiltersOnChange } from "./modules/filters.js";
import { loadKurseData } from "./modules/data.js";
import { filterKurse } from "./modules/filters.js";
import { createCourseCard } from "./modules/setupUI/setupCourseCard.js";
//import { getSearchInputValue } from './search_course.js';


//let currentSearchValue = "";
let currentFilters = {};


async function init() {
  try {
    const kurse = await loadKurseData();
    console.log('Geladene Kursdaten: ', kurse);

    setupUI();
    sort();

    // Kurse filtern
    const gefilterteKurse = filterKurse(kurse, currentFilters);
    console.log('Gefilterte Kurse:', gefilterteKurse);

    updateFiltersOnChange((newFilters) => {
      currentFilters = newFilters;
      console.log("Current Filters: ", currentFilters);

      const gefilterteKurse = filterKurse(kurse, currentFilters);
      console.log('gefilterte Kurse: ', filterKurse(kurse, currentFilters));

      renderCourses(gefilterteKurse);
    });

    renderCourses(gefilterteKurse);

    // Kurse filtern



  } catch (error) {
    console.error("Fehler beim Initialisieren der Anwendung:", error);
    // Geeignete Fehlerbehandlung durchführen
  }
}


init();


function renderCourses(courses) {
  const coursesContainer = document.querySelector(".coursecards-container");
  coursesContainer.innerHTML = ""; // Leeren des Containers vor dem Hinzufügen neuer Karten

  if (courses.length === 0) {
    // Zeige eine Nachricht an, wenn keine Kurse gefunden wurden
    coursesContainer.innerHTML =
      '<h5 class="no-courses-message">Keine Kurse gefunden.</h5>';
  } else {
    // Rendern der Kurskarten, wenn Kurse vorhanden sind
    courses.forEach((kurs) => {
      const courseCard = createCourseCard(kurs);
      coursesContainer.innerHTML += courseCard;
    });
  }
}