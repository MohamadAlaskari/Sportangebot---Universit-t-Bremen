//ältere search input aktivieren 
document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('search');
    var closeButton = document.getElementById('searchNav-close'); // Annahme, dass dies der Schließen-Button ist
    var searchContainer = document.getElementById('search-container');
    var searchFlyout = document.getElementById('searchFlyoutt');

    // Funktion zum Umschalten der Sichtbarkeit
    function toggleSearchVisibility() {
        if (searchContainer.style.display === 'block') {
            searchContainer.style.display = 'none';
            searchFlyout.style.right = '-100%';
        } else {
            searchContainer.style.display = 'block';
            searchFlyout.style.right = '0';
        }
    }

    // Event-Listener für den Toggle-Button
    toggleButton.addEventListener('click', toggleSearchVisibility);

    // Event-Listener für den Schließen-Button
    closeButton.addEventListener('click', function() {
        searchContainer.style.display = 'none';
        searchFlyout.style.right = '-100%';
    });
});


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

    Array.from(accordions).forEach(accordion => {
        accordion.addEventListener("click", () => toggleAccordionPanel(accordion));
    });
}


/* ------------------
=======>  Filter-Related Functions
   -----------------
    */

function initializePriceRange() {
    const rangeInput = document.querySelectorAll(".range-input input"),
        priceInput = document.querySelectorAll(".price-input input"),
        range = document.querySelector(".slider .progress");
    let priceGap = 50;

    priceInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value);

            if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minPrice;
                    range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
                } else {
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                }
            }
        });
    });

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minVal = parseInt(rangeInput[0].value),
                maxVal = parseInt(rangeInput[1].value);

            if (maxVal - minVal < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxVal - priceGap;
                } else {
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
                range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        });
    });

    function getMinValue() {
        return parseInt(priceInput[0].value);
    }

    function getMaxValue() {
        return parseInt(priceInput[1].value);
    }

    return {
        getMinValue,
        getMaxValue
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
    const categories = document.querySelectorAll('input[name="kategorie"]:checked');
    const days = document.querySelectorAll('input[name="tag"]:checked');
    const times = document.querySelectorAll('input[name="zeit"]:checked');
    const details = document.querySelectorAll('input[name^="detail"]:checked');

    // Abrufen der Min und Max Werte aus der Preisrange-Funktion
    const minPrice = document.querySelector(".input-min").value;
    const maxPrice = document.querySelector(".input-max").value;


    return {
        categories: Array.from(categories).map(cb => cb.value),
        days: Array.from(days).map(cb => cb.value),
        times: Array.from(times).map(cb => cb.value),
        price: {
            min: minPrice,
            max: maxPrice
        },
        details: Array.from(details).map(cb => cb.value)
    };
}

function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('change', () => {
            const filters = updateSelectedFilters();
            console.log(filters); // Hier können Sie die Filterwerte anzeigen oder verarbeiten
        });
    }
}



/* ------------------
=======>   Sort-Related Functions  
Beispiel für den Abruf des ausgewählten Sortierwerts
 Später können Sie diese Funktion aufrufen, um den Wert für Datenbankabfragen zu erhalten
 console.log(sortDropdownManager.getSelectedSortValue());
   -----------------
    */


function manageSortDropdown() {
    const sortDropdown = document.querySelector('.fl-select-dropdown');
    const sortBtnText = document.querySelector('.fl-select-btn__text');
    const radioButtons = sortDropdown.querySelectorAll('input[type="radio"]');
    let selectedSortValue = ''; // Variable zum Speichern des ausgewählten Werts

    function updateSortText(selectedOption) {
        if (selectedOption && selectedOption.value !== 'none') {
            sortBtnText.textContent = selectedOption.nextElementSibling.textContent;
            selectedSortValue = selectedOption.value;
        } else {
            sortBtnText.textContent = 'Sortieren';
            selectedSortValue = '';
        }
    }

    const wrapper = document.querySelector('.fl-select-wrapper');
    wrapper.addEventListener('click', function (event) {
        // Verhindert, dass das Event zum document-Objekt weitergegeben wird
        event.stopPropagation();
        this.classList.toggle('open');
    });

    document.addEventListener('click', function () {
        wrapper.classList.remove('open');
    });

    sortDropdown.addEventListener('click', (event) => {
        if (event.target.type === 'radio') {
            updateSortText(event.target);
            wrapper.classList.remove('open');
            event.stopPropagation(); // Verhindert, dass das Klicken auf einen Radio-Button das wrapper click-Event auslöst
        }
    });

    updateSortText(Array.from(radioButtons).find(radio => radio.checked));

    function getSelectedSortValue() {
        return selectedSortValue;
    }

    return {
        getSelectedSortValue
    };
}


/* ------------------
=======>   Course Create and Display Functions
   -----------------
    */

function createCourseCard(kurs) {
    // Funktion, um die Beschreibung auf maximal 150 Zeichen zu kürzen
    function getShortDescription(description) {
        return description.length > 90 ? description.substring(0, 90) + '...' : description;
    }

    const shortDescription = getShortDescription(kurs.beschreibung);
    // Prüfen, ob ein "Mehr lesen"-Link benötigt wird
    const readMoreLink = kurs.beschreibung.length > 90 ? `<a href="#" class="more-link" data-id="${kurs.nummer}">Mehr lesen</a>` : '';

    // Erstelle Strings für jeden Zeitpunkt im Array
    let zeitenStrings = kurs.zeiten.map(zeitpunkt => {
        return `<span class=""><i class="fa-solid fa-calendar-days"></i>${zeitpunkt.tag}</span> <span><i class="fa-regular fa-clock"></i>${zeitpunkt.zeit}</span> `;
    }).join('<br>');

    // Fallback, falls keine Zeiten vorhanden sind
    if (kurs.zeiten.length === 0) {
        zeitenStrings = `<span>Keine Zeiten angegeben</span>`;
    }

    // Überprüfen, ob der Kurs ausgebucht ist oder anmeldefrei ist
    let coursLink = '';
    if (kurs.details.includes("Ausgebucht")) {
        coursLink = '<p class="card-actions ausgebucht">Kurs Ausgebucht</p>';
    } else if (kurs.details.includes("Anmeldefrei")) {
        coursLink = '<p class="card-actions"><b><a href="#" class="has-text-grey">Kurs Buchen <i class="fa fa-chevron-down" aria-hidden="true"></i></a></b></p>';
    } else {
        coursLink = '<p class="card-actions ausgebucht">Kurs Ausgebucht</p>';
    }

    return `
        <div class="blog-card">
            <div class="image-wrapper">
                <div class="image" style="background-image: url('${kurs.pfadbild}')"></div>
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
                        <span><i class="fa-solid fa-location-dot"></i>  ${kurs.ort} </span>
                        <span> </span>
                    </div>
                </div>

                <div class="card-block course-info">
                    <div class="card-course-info">
                        <span class="card-text tutor-name"><i class="fa-solid fa-user-tie"></i>${kurs.leitung}</span>
                        <span class="tutor-description"><i class="fa-regular fa-registered"></i>${kurs.details.join(', ')}</span>
                    </div>
                    <div class="card-course-info">
                        <p>${kurs.preis} <i class="fa-solid fa-euro-sign" aria-hidden="true"></i></p>
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
        const coursesContainer = document.querySelector('.coursecards-container');
        if (!coursesContainer) {
            console.error("Kurscontainer nicht gefunden!");
            return;
        }

        data.kurse.forEach(kurs => {
            const courseCard = createCourseCard(kurs);
            coursesContainer.innerHTML += courseCard;
        });
    } catch (error) {
        console.error("Fehler beim Anzeigen der Kurse:", error);
    }
}


async function loadKurseData() {
    try {
        const response = await fetch('assets/data/kurseData.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error('Fehler beim Laden der Kursdaten:', e);
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
    const meinFilterDropdown = document.getElementById('meinFilterDropdown');
    if (meinFilterDropdown) {
        meinFilterDropdown.addEventListener('change', applyFilters);
    } else {
        console.error('Element meinFilterDropdown wurde nicht gefunden.');
    }

    const meineCheckbox = document.getElementById('meineCheckbox');
    if (meineCheckbox) {
        meineCheckbox.addEventListener('change', applyFilters);
    } else {
        console.error('Element meineCheckbox wurde nicht gefunden.');
    }
}

// App initialisieren
document.addEventListener('DOMContentLoaded', app);







function filterKurse(data, filters) {
    if (!data || !data.kurse) {
        console.error('Keine Kursdaten zum Filtern verfügbar.');
        return [];
    }

    return data.kurse.filter(kurs => {
        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(kurs.kategorie);
        const matchesDay = filters.days.length === 0 || filters.days.includes(kurs.tag);
        const matchesTime = filters.times.length === 0 || filters.times.includes(kurs.zeit);

        // Hier nehmen wir an, dass die Preisfilter als Zahlen bereitgestellt werden
        const withinPriceRange = (!filters.price.min || kurs.preis >= filters.price.min) &&
            (!filters.price.max || kurs.preis <= filters.price.max);

        const matchesDetails = filters.details.length === 0 || filters.details.every(detail => kurs.details.includes(detail));

        return matchesCategory && matchesDay && matchesTime && withinPriceRange && matchesDetails;
    });
}

// Beispiel: Event-Listener für ein Dropdown-Menü
//document.getElementById('meinFilterDropdown').addEventListener('change', applyFilters);

// Beispiel: Event-Listener für eine Checkbox
//document.getElementById('meineCheckbox').addEventListener('change', applyFilters);

async function applyFilters() {
    const kurseData = await loadKurseData();
    if (!kurseData) return;

    const filters = updateSelectedFilters();
    const filteredKurse = filterKurse(kurseData, filters);

    console.log('filteredKurse: ' + JSON.stringify(filteredKurse, null, 2));

    if (filteredKurse.length > 0) {
        const ersteKursKategorie = filteredKurse[0].kategorie;
        console.log('Kategorie des ersten Kurses:', ersteKursKategorie);
    } else {
        console.log('Keine Kurse gefunden.');
    }
}


//cards






// Deine anderen Funktionen...


// Event-Listener für "Mehr lesen"-Links
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.more-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const courseId = this.getAttribute('data-id');
            document.getElementById('short-course-' + courseId).style.display = 'none';
            document.getElementById('full-course-' + courseId).style.display = 'block';
        });
    });
});

