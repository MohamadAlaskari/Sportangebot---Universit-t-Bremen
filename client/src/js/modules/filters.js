

// Helper function to retrieve selected values from checkboxes based on their name attribute.
function getCheckedValuesOf(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map(input => input.value);
}

// Function to retrieve selected categories.
function updateSelectedKategorie() {
  return { categories: getCheckedValuesOf("kategorie") };
}

// Function to retrieve selected days.
function updateSelectedDays() {
  return { days: getCheckedValuesOf("tag") };
}

// Function to retrieve selected times.
function updateSelectedTimes() {
  return { times: getCheckedValuesOf("zeit") };
}

// Function to retrieve selected details.
function updateSelectedDetails() {
  return { details: getCheckedValuesOf("detail") };
}

// Function to retrieve the selected price range.
function updateSelectedPreis() {
  const minPrice = document.querySelector(".input-min").value;
  const maxPrice = document.querySelector(".input-max").value;
  return {
    price: {
      min: minPrice,
      max: maxPrice,
    }
  };
}

// Main function that compiles all individual filter values into a single object.
function getSelectedFilters() {
  return {

    ...updateSelectedKategorie(),
    ...updateSelectedDays(),
    ...updateSelectedTimes(),
    ...updateSelectedPreis(),
    ...updateSelectedDetails()
  };
}

// Function that adds event listeners to filter inputs and updates filters on change.
function updateFiltersOnChange(onFiltersChanged) {
  const filterInputs = document.querySelectorAll(
    'input[name="kategorie"], input[name="tag"], input[name="zeit"], input[name^="detail"], .input-min, .input-max'
  );
  const currentFilters = getSelectedFilters();
  onFiltersChanged(currentFilters);

  filterInputs.forEach(input => {
    input.addEventListener('change', () => {
      const currentFilters = getSelectedFilters();
      onFiltersChanged(currentFilters);
    });
  });
}


function filterKurse(courses, filters) {
  // Überprüfen, ob gültige courses und Filter vorhanden sind
  if (!Array.isArray(courses) || !filters) {
    console.error("Ungültige courses oder Filter.");
    return [];
  }

  function convertTimeToWindow(time) {
    const hour = parseInt(time.split(':')[0]); // Extrahiert die Stunde aus dem Zeitstring (z.B. "10:00")

    // Konvertiert die spezifische Zeit in ein allgemeines Zeitfenster
    if (hour < 10) return 'vor 10 Uhr';
    if (hour >= 10 && hour < 13) return '10-13 Uhr';
    if (hour >= 13 && hour < 15) return '13-15 Uhr';
    if (hour >= 15 && hour < 18) return '15-18 Uhr';
    return 'nach 18 Uhr';
  }

  return courses.filter(kurs => {
    // Kategorie-Filter
    const matchesCategory = !filters.categories || filters.categories.length === 0 || filters.categories.includes(kurs.kategorie);

    // Tage-Filter
    const matchesDay = !filters.days || filters.days.length === 0 || kurs.zeiten.some(zeit => filters.days.includes(zeit.tag));

    // Zeiten-Filter: Überprüft, ob eine der Kurszeiten mit den ausgewählten Zeiten übereinstimmt
    const matchesTime = !filters.times || filters.times.length === 0 || kurs.zeiten.some(zeit => {
      // Konvertiert Startzeit jeder Kurszeit in ein allgemeines Zeitfenster
      const timeWindow = convertTimeToWindow(zeit.zeit.split('-')[0].trim());
      return filters.times.includes(timeWindow);
    });

    // Preis-Filter
    const withinPriceRange = (!filters.price || !filters.price.min || kurs.preis >= filters.price.min) &&
      (!filters.price || !filters.price.max || kurs.preis <= filters.price.max);

    // Details-Filter
    const matchesDetails = !filters.details || filters.details.length === 0 || filters.details.every(detailFilter => {
      if (detailFilter === "auch anmeldefreie Angebote anzeigen") {
        return kurs.details.includes("Anmeldefrei");
      } else if (detailFilter === "auch ausgebuchte Angebote anzeigen") {
        return kurs.details.includes("Ausgebucht");
      } else if (detailFilter === "nur Angebote in barrierefreien Räumen/Orten anzeigen") {
        return kurs.details.includes("Barrierefrei");
      }
      return true;
    });

    return matchesCategory && matchesDay && matchesTime && withinPriceRange && matchesDetails;
  });
}


// Exports the function to update filters on changes.
export { updateFiltersOnChange, filterKurse }
