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

    filterInputs.forEach(input => {
        input.addEventListener('change', () => {
            const currentFilters = getSelectedFilters();
          //  console.log("Updated Filters: ", currentFilters);
            onFiltersChanged(currentFilters); 
        });
    });
}

// Exports the function to update filters on changes.
export { updateFiltersOnChange }
