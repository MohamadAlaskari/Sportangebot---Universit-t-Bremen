
function updateSortText(selectedOption) {
    const sortBtnText = document.querySelector(".sort-btn__text");
    
    if (selectedOption && selectedOption.value !== "none") {
        sortBtnText.textContent = selectedOption.nextElementSibling.textContent;
    } else {
        sortBtnText.textContent = "Sortieren";
    }
    
    const wrapper = document.querySelector(".sort-menu-container");
    wrapper.classList.remove("open");
}

function getSelectedSortValue() {
    const selectedRadioButton = document.querySelector('.sortDropdown input[type="radio"]:checked');
    updateSortText(selectedRadioButton);
    return selectedRadioButton ? selectedRadioButton.value : "";
}

function sortKurse(courses, sortValue) {
    if (!courses || !Array.isArray(courses)) {
        console.error("Invalid 'courses' array for sorting.");
        return [];
    }

    if (typeof sortValue !== 'string') {
        console.error("Invalid 'sortValue'. Expected a string.");
        return [...courses]; // Rückgabe der unveränderten Kursliste
    }

    let sortedKurse = [...courses]; // Erstellen einer Kopie des Arrays

    switch (sortValue) {
        case "Niedriger Preis":
            sortedKurse.sort((a, b) => a.preis - b.preis);
            break;
        case "Höchster Preis":
            sortedKurse.sort((a, b) => b.preis - a.preis);
            break;
        case "Kategorie":
            sortedKurse.sort((a, b) => a.kategorie.localeCompare(b.kategorie));
            break;
        case "alpha":
            sortedKurse.sort((a, b) => a.titel.localeCompare(b.titel));
            break;
        default:
            console.warn("noch keine Sortieroption: ", sortValue);
           
            break;
    }

    return sortedKurse;
}




export { sortKurse, getSelectedSortValue };
