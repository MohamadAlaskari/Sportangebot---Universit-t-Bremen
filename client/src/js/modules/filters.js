

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

      //  console.log("Updated Filters: ", currentFilters);
      onFiltersChanged(currentFilters);
    });
  });
}
/*
function filterKurse(data, filters) {
  if (!data || !data.kurse) {
    console.error("Keine Kursdaten zum Filtern verfügbar.");
    return [];
  }

  // Überprüfen, ob die Filter definiert sind
  if (!filters || !filters.categories || !filters.days || !filters.times) {
    console.error("Ungültige Filter.");
    return data.kurse; // Wenn die Filter nicht definiert sind, gib alle Kurse zurück.
  }

  return data.kurse.filter((kurs) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(kurs.kategorie);

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
*/

function filterKurse(data, filters) {
  // Überprüfen, ob gültige Daten und Filter vorhanden sind
  if (!data || !data.kurse || !filters) {
    console.error("Ungültige Daten oder Filter.");
    return [];
  }

  function convertTimeToWindow(time) {
    const hour = parseInt(time.split(':')[0]);   // Extracts the hour from the time string (e.g., "10:00")

    // Converts the specific time to a general time window
    if (hour < 10) return 'vor 10 Uhr';
    if (hour >= 10 && hour < 13) return '10-13 Uhr';
    if (hour >= 13 && hour < 15) return '13-15 Uhr';
    if (hour >= 15 && hour < 18) return '15-18 Uhr';
    return 'nach 18 Uhr';
  }

  return data.kurse.filter(kurs => {
    // Kategorie-Filter
    const matchesCategory = !filters.categories || filters.categories.length === 0 || filters.categories.includes(kurs.kategorie);

    // Days-Filter
    const matchesDay = !filters.days || filters.days.length === 0 || kurs.zeiten.some(zeit => filters.days.includes(zeit.tag));

    // Times-Filter: Hier prüfen wir, ob irgendeine der kurs.zeiten mit den ausgewählten Zeiten übereinstimmt
    const matchesTime = !filters.times || filters.times.length === 0 || kurs.zeiten.some(zeit => {
      // Converts start time of each course time to a general time window
      const timeWindow = convertTimeToWindow(zeit.zeit.split('-')[0].trim());
      return filters.times.includes(timeWindow);
    });
    // Preis-Filter
    const withinPriceRange = (!filters.price || !filters.price.min || kurs.preis >= filters.price.min) &&
      (!filters.price || !filters.price.max || kurs.preis <= filters.price.max);

    // Details-Filter
    const matchesDetails = !filters.details || filters.details.length === 0 || filters.details.every((detailFilter) => {
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

    return matchesCategory && matchesDay && matchesTime && withinPriceRange && matchesDetails;
  });
}


// Exports the function to update filters on changes.
export { updateFiltersOnChange, filterKurse }
