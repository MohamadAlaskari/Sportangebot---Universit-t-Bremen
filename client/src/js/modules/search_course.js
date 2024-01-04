/*function searchCourse() {
    return new Promise((resolve, reject) => {
        const searchCourse_btn = document.getElementById('searchCourse-btn');

        searchCourse_btn.onclick = () => {
            const searchInputValue = document.getElementById("search-input").value;
            document.getElementById("search-input").value = "";
            

            if (searchInputValue.trim() === "") {
                reject(new Error("Das Eingabefeld ist leer."));
            } else {
                resolve(searchInputValue);
            }
        };
    });
}*/

function getSearchInputValue() {
    const searchInput = document.getElementById("search-input");
    const searchInputValue = searchInput.value;
    searchInput.value = ""; // Bereinigen des Suchfeldes
    return searchInputValue.trim();
}

export { getSearchInputValue };

//export { searchCourse };
