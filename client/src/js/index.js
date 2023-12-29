import { setupUI } from "./modules/setupUI/setupUI.js";
import { sort } from "./modules/sort.js";
import { updateFiltersOnChange } from "./modules/filters.js";
import { loadKurseData } from "./modules/data.js";
//import { getSearchInputValue } from './search_course.js';


//let currentSearchValue = "";
let currentFilters = {};


async function init() {
  try {
    const kurse = await loadKurseData();

    setupUI();
    sort();

    updateFiltersOnChange((newFilters) => {
      currentFilters = newFilters;
      console.log("Current Filters: ", currentFilters);
    });

    // Event-Listener für die Suchschaltfläche
    /*
    document.getElementById('searchCourse-btn').addEventListener('click', () => {
      currentSearchValue = getSearchInputValue();
      console.log("Aktueller Suchwert: ", currentSearchValue);
      // Hier können Sie weitere Aktionen basierend auf dem Suchwert durchführen
    });
        // Laden der Kursdaten
    
          // Aktualisieren der Filter und Speichern der Werte in currentFilters
    
    
    */
    console.log(kurse); // Beispiel: Ausgabe der Kursdaten in der Konsole

  } catch (error) {
    console.error("Fehler beim Initialisieren der Anwendung:", error);
    // Geeignete Fehlerbehandlung durchführen
  }
}


init();


