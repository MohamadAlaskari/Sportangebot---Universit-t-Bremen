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

    return selectedValue; // Gibt den ausgewählten Wert zurück
}

function updateSortText(selectedOption) {
    const sortBtnText = document.querySelector(".sort-btn__text");

    if (selectedOption && selectedOption.value !== "none") {
        sortBtnText.textContent = selectedOption.nextElementSibling.textContent;
    } else {
        sortBtnText.textContent = "Sortieren";
    }
}



const sort = () => {
    currentSortOption();
}

export { sort };
