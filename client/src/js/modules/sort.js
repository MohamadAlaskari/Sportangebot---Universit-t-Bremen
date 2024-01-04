function currentSortOption() {
    const wrapper = document.querySelector(".sort-menu-container");
    const sortDropdown = document.querySelector(".sortDropdown");
    const radioButtons = sortDropdown.querySelectorAll('input[type="radio"]');
    let selectedValue = ""; // Lokale Variable zur Speicherung des ausgewählten Wertes

    Array.from(radioButtons).forEach((radio) => {
        radio.addEventListener("change", (event) => {
            selectedValue = event.target.value; // Aktualisiere den ausgewählten Wert
            updateSortText(event.target);
            wrapper.classList.remove("open");
        });
    });

    return selectedValue;
}

function updateSortText(selectedOption) {
    const sortBtnText = document.querySelector(".sort-btn__text");

    if (selectedOption && selectedOption.value !== "none") {
        sortBtnText.textContent = selectedOption.nextElementSibling.textContent;
    } else {
        sortBtnText.textContent = "Sortieren";
    }
}



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



export { currentSortOption, sortKurse };
