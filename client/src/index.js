//ältere search input aktivieren
document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById("search");
  var closeButton = document.getElementById("searchNav-close"); // Annahme, dass dies der Schließen-Button ist
  var searchContainer = document.getElementById("search-container");
  var searchFlyout = document.getElementById("searchFlyoutt");

  // Funktion zum Umschalten der Sichtbarkeit
  function toggleSearchVisibility() {
    if (searchContainer.style.display === "block") {
      searchContainer.style.display = "none";
      searchFlyout.style.right = "-100%";
    } else {
      searchContainer.style.display = "block";
      searchFlyout.style.right = "0";
    }
  }

  // Event-Listener für den Toggle-Button
  toggleButton.addEventListener("click", toggleSearchVisibility);

  // Event-Listener für den Schließen-Button
  closeButton.addEventListener("click", function () {
    searchContainer.style.display = "none";
    searchFlyout.style.right = "-100%";
  });
});

/*
search fuktion in sidenavebar
*/
async function suche() {
  var suchbegriff = await document.getElementById("search-input").value;
  console.log("searchInput: ", suchbegriff);
  document.getElementById("search-input").value = "";
  return suchbegriff;
}

/* ------------------
=======> Sidebar-Related Functions
navbar open and close 
   -----------------
    */

function toggleNav() {
  var sideNavBar = document.getElementById("sideNavBar");
  sideNavBar.classList.toggle("sideNavBar-active");
}

/* ------------------
=======>  Accordion-Related Functions 
accordion open and close 
   -----------------
    */

function initializeAccordions() {
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

document.addEventListener("DOMContentLoaded", () => {
  initializePriceRange();
});
/* ------------------
=======>  Filter-Related Functions
   -----------------
    */

async function findMaxCoursePrice() {
  try {
    const response = await fetch("data/kurseData.json"); // Pfad zu Ihrer JSON-Datei
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const kurseData = await response.json();
    return kurseData.kurse.reduce((max, kurs) => Math.max(max, kurs.preis), 0);
  } catch (e) {
    console.error("Fehler beim Ermitteln des Höchstpreises:", e);
    return 0; // oder einen Standardwert zurückgeben
  }
}

async function initializePriceRange() {
  const rangeMinInput = document.querySelector(".range-input .range-min"),
    rangeMaxInput = document.querySelector(".range-input .range-max"),
    priceMinInput = document.querySelector(".price-input .input-min"),
    priceMaxInput = document.querySelector(".price-input .input-max"),
    range = document.querySelector(".slider .progress");
  let priceGap = 5;

  // Ermittle den höchsten Preis aus den Kursdaten
  const maxPrice = await findMaxCoursePrice();
  if (priceMaxInput) priceMaxInput.value = maxPrice; // Setze den Wert im Textfeld
  // Hier sollten Sie auch den Maximalwert für den Slider anpassen
  if (rangeMaxInput) rangeMaxInput.value = maxPrice;

  // Event-Listener für die Preisinputs
  [priceMinInput, priceMaxInput].forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceMinInput.value),
        maxPrice = parseInt(priceMaxInput.value);

      if (maxPrice - minPrice >= priceGap) {
        if (e.target === priceMinInput) {
          rangeMinInput.value = minPrice;
          range.style.left = (minPrice / rangeMaxInput.max) * 100 + "%";
        } else {
          rangeMaxInput.value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeMaxInput.max) * 100 + "%";
        }
      }
    });
  });

  // Event-Listener für die Range-Inputs
  [rangeMinInput, rangeMaxInput].forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeMinInput.value),
        maxVal = parseInt(rangeMaxInput.value);

      if (maxVal - minVal >= priceGap) {
        if (e.target === rangeMinInput) {
          priceMinInput.value = minVal;
        } else {
          priceMaxInput.value = maxVal;
        }
        range.style.left = (minVal / rangeMaxInput.max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeMaxInput.max) * 100 + "%";
      }
    });
  });

  // Hilfsfunktionen zur Ermittlung der Werte
  function getMinValue() {
    return parseInt(priceMinInput.value);
  }

  function getMaxValue() {
    return parseInt(priceMaxInput.value);
  }

  return {
    getMinValue,
    getMaxValue,
  };
}

function addPriceRangeListeners() {
  const rangeInputs = document.querySelectorAll(".range-input input");

  rangeInputs.forEach((input) => {
    input.addEventListener("input", updateAndLogFilters);
  });
}

function updateAndLogFilters() {
  const filters = updateSelectedFilters();
  console.log(filters);
}
//ende preis

function updateSelectedFilters() {
  const suchbegriff = document.getElementById("search-input").value;
  const categories = document.querySelectorAll(
    'input[name="kategorie"]:checked'
  );
  const days = document.querySelectorAll('input[name="tag"]:checked');
  const times = document.querySelectorAll('input[name="zeit"]:checked');
  const details = document.querySelectorAll('input[name^="detail"]:checked');

  // Abrufen der Min und Max Werte aus der Preisrange-Funktion
  const minPrice = document.querySelector(".input-min").value;
  const maxPrice = document.querySelector(".input-max").value;

  return {
    categories: Array.from(categories).map((cb) => cb.value),
    title: suchbegrif,
    days: Array.from(days).map((cb) => cb.value),
    times: Array.from(times).map((cb) => cb.value),
    price: {
      min: minPrice,
      max: maxPrice,
    },
    details: Array.from(details).map((cb) => cb.value),
  };
}

function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", () => {
      const filters = updateSelectedFilters();
      console.log(filters); // Hier können Sie die Filterwerte anzeigen oder verarbeiten
      applyFilters(); // Aktualisiere die Kursliste basierend auf den neuen Filtern
    });
  }
}

function filterKurse(data, filters) {
  if (!data || !data.kurse) {
    console.error("Keine Kursdaten zum Filtern verfügbar.");
    return [];
  }

  return data.kurse.filter((kurs) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(kurs.kategorie);
    const matchesTitle = filters.titel
    const matchesDay =
      filters.days.length === 0 ||
      kurs.zeiten.some((zeit) => filters.days.includes(zeit.tag));
    const matchesTime =
      filters.times.length === 0 || filters.times.includes(kurs.zeit);

    // Hier nehmen wir an, dass die Preisfilter als Zahlen bereitgestellt werden
    const withinPriceRange =
      (!filters.price.min || kurs.preis >= filters.price.min) &&
      (!filters.price.max || kurs.preis <= filters.price.max);

    // Filterung nach Angebotsdetails
    const matchesDetails = filters.details.every((detailFilter) => {
      if (detailFilter === "auch anmeldefreie Angebote anzeigen") {
        return kurs.details.includes("Anmeldefrei");
      } else if (detailFilter === "auch ausgebuchte Angebote anzeigen") {
        return kurs.details.includes("Ausgebucht");
      } else if (
        detailFilter === "nur Angebote in barrierefreien Räumen/Orten anzeigen"
      ) {
        return kurs.details.includes("Barrierefrei");
      }
      return true;
    });
    return (
      matchesCategory &&
      matchesDay &&
      matchesTime &&
      withinPriceRange &&
      matchesDetails
    );
  });
}

/* ------------------
=======>   Sort-Related Functions  
Beispiel für den Abruf des ausgewählten Sortierwerts
 Später können Sie diese Funktion aufrufen, um den Wert für Datenbankabfragen zu erhalten
 console.log(sortDropdownManager.getSelectedSortValue());
   -----------------
    */

function manageSortDropdown() {
  const sortDropdown = document.querySelector(".sortDropdown");
  const sortBtnText = document.querySelector(".sort-btn__text");
  const radioButtons = sortDropdown.querySelectorAll('input[type="radio"]');
  let selectedSortValue = "";

  function updateSortText(selectedOption) {
    if (selectedOption && selectedOption.value !== "none") {
      sortBtnText.textContent = selectedOption.nextElementSibling.textContent;
      selectedSortValue = selectedOption.value;
    } else {
      sortBtnText.textContent = "Sortieren";
      selectedSortValue = "";
    }
  }

  const wrapper = document.querySelector(".sort-menu-container");
  wrapper.addEventListener("click", function (event) {
    event.stopPropagation();
    this.classList.toggle("open");
  });

  document.addEventListener("click", function () {
    wrapper.classList.remove("open");
  });

  Array.from(radioButtons).forEach((radio) => {
    radio.addEventListener("change", (event) => {
      updateSortText(event.target);
      applySort(event.target.value); // Aufrufen der Sortierfunktion bei Änderung
      wrapper.classList.remove("open");
    });
  });

  function applySort(sortValue) {
    loadKurseData()
      .then((kurseData) => {
        const sortedKurse = sortKurse(kurseData.kurse, sortValue);
        renderCourses(sortedKurse);
      })
      .catch((error) =>
        console.error("Fehler beim Sortieren der Kurse:", error)
      );
  }

  function getSelectedSortValue() {
    return selectedSortValue;
  }

  // Initialisiere das Dropdown mit dem aktuell ausgewählten Wert
  const initialSelectedRadio = Array.from(radioButtons).find(
    (radio) => radio.checked
  );
  if (initialSelectedRadio) {
    updateSortText(initialSelectedRadio);
  }

  return {
    getSelectedSortValue,
  };
}

// Implementierung der sortKurse Funktion

function sortKurse(kurse, sortValue) {
  let sortedKurse = [...kurse]; // Erstellen einer Kopie des Arrays

  if (sortValue === "Niedriger Preis") {
    sortedKurse.sort((a, b) => a.preis - b.preis);
  } else if (sortValue === "Höchster Preis") {
    sortedKurse.sort((a, b) => b.preis - a.preis);
  } else if (sortValue === "Kategorie") {
    sortedKurse.sort((a, b) => a.kategorie.localeCompare(b.kategorie));
  } else if (sortValue === "alpha") {
    sortedKurse.sort((a, b) => a.titel.localeCompare(b.titel));
  }
  // Keine Sortierung für 'none'

  return sortedKurse;
}
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

/* ------------------
=======>   Course Create and Display Functions
   -----------------
    */

function createCourseCard(kurs) {
  // Funktion, um die Beschreibung auf maximal 150 Zeichen zu kürzen
  function getShortDescription(description) {
    return description.length > 90
      ? description.substring(0, 90) + "..."
      : description;
  }

  const shortDescription = getShortDescription(kurs.beschreibung);
  // Prüfen, ob ein "Mehr lesen"-Link benötigt wird
  const readMoreLink =
    kurs.beschreibung.length > 90
      ? `<a href="#" class="more-link" data-id="${kurs.nummer}">Mehr lesen</a>`
      : "";

  // Erstelle Strings für jeden Zeitpunkt im Array
  let zeitenStrings = kurs.zeiten
    .map((zeitpunkt) => {
      return `<span class=""><i class="fa-solid fa-calendar-days"></i>${zeitpunkt.tag}</span> <span><i class="fa-regular fa-clock"></i>${zeitpunkt.zeit}</span> `;
    })
    .join("<br>");

  // Fallback, falls keine Zeiten vorhanden sind
  if (kurs.zeiten.length === 0) {
    zeitenStrings = `<span>Keine Zeiten angegeben</span>`;
  }

  // Überprüfen, ob der Kurs ausgebucht ist oder anmeldefrei ist
  let coursLink = "";
  if (kurs.details.includes("Ausgebucht")) {
    coursLink = '<p class="card-actions ausgebucht">Kurs Ausgebucht</p>';
  } else if (kurs.details.includes("Anmeldefrei")) {
    coursLink =
      '<p class="card-actions"><b><a href="#" class="has-text-grey">Kurs Buchen <i class="fa fa-chevron-down" aria-hidden="true"></i></a></b></p>';
  } else {
    coursLink = '<p class="card-actions ausgebucht">Kurs Ausgebucht</p>';
  }

  return `
        <div class="blog-card">
            <div class="image-wrapper">
                <div class="image" style="background-image: url('${kurs.pfadbild
    }')"></div>
            </div>
            <div class="description">
                <h1>${kurs.titel}</h1>
                <h2>${kurs.kategorie}</h2>
                <p class="course-description">${shortDescription}${readMoreLink}</p>
                <hr>

                <div class="card-block course-info">
                    <div class="card-course-info">
                        ${zeitenStrings}
                    </div>

                    <div class="card-course-info">
                        <span><i class="fa-solid fa-location-dot"></i>  ${kurs.ort
    } </span>
                        <span> </span>
                    </div>
                </div>

                <div class="card-block course-info">
                    <div class="card-course-info">
                        <span class="card-text tutor-name"><i class="fa-solid fa-user-tie"></i>${kurs.leitung
    }</span>
                        <span class="tutor-description"><i class="fa-regular fa-registered"></i>${kurs.details.join(
      ", "
    )}</span>
                    </div>
                    <div class="card-course-info">
                        <p>${kurs.preis
    } <i class="fa-solid fa-euro-sign" aria-hidden="true"></i></p>
                    </div>
                </div>
                <hr>
                ${coursLink}
            </div>
        </div>
    `;
}

async function displayCourses() {
  try {
    const data = await loadKurseData();
    console.log("Geladene Kurse:", data); // Überprüfe die geladenen Daten
    const coursesContainer = document.querySelector(".coursecards-container");
    if (!coursesContainer) {
      console.error("Kurscontainer nicht gefunden!");
      return;
    }

    data.kurse.forEach((kurs) => {
      const courseCard = createCourseCard(kurs);
      coursesContainer.innerHTML += courseCard;
    });
  } catch (error) {
    console.error("Fehler beim Anzeigen der Kurse:", error);
  }
}

async function loadKurseData() {
  try {
    const response = await fetch("data/kurseData.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error("Fehler beim Laden der Kursdaten:", e);
    return null; // oder geeignete Fehlerbehandlung
  }
}

function app() {
  manageSortDropdown();
  initializeAccordions();
  initializePriceRange();
  addCheckboxListeners();
  addPriceRangeListeners();
  displayCourses();

  // Verwende die Event Listener nur, wenn die Elemente existieren
  const meinFilterDropdown = document.getElementById("meinFilterDropdown");
  if (meinFilterDropdown) {
    meinFilterDropdown.addEventListener("change", applyFilters);
  } else {
    console.error("Element meinFilterDropdown wurde nicht gefunden.");
  }

  const meineCheckbox = document.getElementById("meineCheckbox");
  if (meineCheckbox) {
    meineCheckbox.addEventListener("change", applyFilters);
  } else {
    console.error("Element meineCheckbox wurde nicht gefunden.");
  }

  loadKurseData().then((data) => renderCourses(data.kurse));
}

// App initialisieren
document.addEventListener("DOMContentLoaded", app);

// Beispiel: Event-Listener für ein Dropdown-Menü
document
  .getElementById("meinFilterDropdown")

// Beispiel: Event-Listener für eine Checkbox
document
  .getElementById("meineCheckbox")
  .addEventListener("change", applyFilters);

async function applyFilters() {
  const kurseData = await loadKurseData();
  if (!kurseData) return;

  const filters = updateSelectedFilters();
  const filteredKurse = filterKurse(kurseData, filters);

  console.log("filteredKurse: " + JSON.stringify(filteredKurse, null, 2));
  renderCourses(filteredKurse); // Zeige die gefilterten Kurse an
}

// Deine anderen Funktionen...

// Event-Listener für "Mehr lesen"-Links
document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".more-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const courseId = this.getAttribute("data-id");
      document.getElementById("short-course-" + courseId).style.display =
        "none";
      document.getElementById("full-course-" + courseId).style.display =
        "block";
    });
  });
});
