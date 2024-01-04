
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("more-link")) {
        event.preventDefault();
        const courseId = event.target.dataset.id;
        const shortDescription = document.getElementById(`shortDescription-${courseId}`);
        const moreText = document.getElementById(`more-${courseId}`);

        if (moreText) {
            const isShowingMore = moreText.style.display === "none";

            // Umschalten der Anzeige
            moreText.style.display = isShowingMore ? "inline" : "none";
            shortDescription.style.display = isShowingMore ? "none" : "inline";

            // Aktualisieren des Link-Textes
            event.target.textContent = isShowingMore ? "Weniger lesen" : "Mehr lesen";
        }
    }
});

function createCourseCard(kurs) {
    // Bestimmen, ob ein "Mehr lesen"-Link benötigt wird
    const limit = 90;
    const moreTextNeeded = kurs.beschreibung.length > limit;
    const shortDescription = moreTextNeeded ? kurs.beschreibung.substring(0, limit) + "..." : kurs.beschreibung;
    const moreText = moreTextNeeded ? kurs.beschreibung.substring(limit) : "";
    const readMoreLink = moreTextNeeded ? `<a href="#" class="more-link" data-id="${kurs.nummer}">Mehr lesen</a>` : "";

    // Erstellen von Zeichenketten für die Zeitangaben
    const zeitenStrings = createZeitenStrings(kurs.zeiten);

    // Erstellen des Links für die Kursbuchung oder den Hinweis auf Ausbuchung
    const coursLink = createCourseLink(kurs.details);

    // Zusammenstellen der gesamten Kurskarte
    return `
        <div class="blog-card">
            <div class="image-wrapper">
                <div class="image" style="background-image: url('${kurs.pfadbild}')"></div>
            </div>
            <div class="description">
                <h1>${kurs.titel} für <span class="zielgruppe">${kurs.zielgruppe}</span></h1>
                <h2>${kurs.kategorie}</h2>
                <p class="course-description">
                    <span id="shortDescription-${kurs.nummer}">${shortDescription}</span>
                    <span class="more-text" id="more-${kurs.nummer}" style="display: none;">${moreText}</span>
                    ${readMoreLink}
                </p>
                <hr>
                <div class="course-info">
                    <div class="course-time">${zeitenStrings}</div><br>
                    <div class="course-location"><i class="fa-solid fa-location-dot course-info-icon"></i>${kurs.map[0].ort}</div>
                    <br>
                    <div class="course-tutor-details-price">

                        <div class="course-tutor-details card-course-info ">
                            <div class="course-tutor"><i class="fa-solid fa-user-tie course-info-icon"></i>${kurs.leitung}</div>
                            <div class="course-details"><i class="fa-regular fa-registered course-info-icon"></i>${kurs.details.join(", ")}</div>
                        </div>
                        <div class="card-course-info">
                            <div class="course-price">${kurs.preis} <i class="fa-solid fa-euro-sign"></i></div>
                        </div>
                    </div>
                </div>
                <hr>
                ${coursLink}
            </div>
        </div>
    `;
}

function createZeitenStrings(zeiten) {
    if (zeiten.length === 0) {
        return `<span>Keine Zeiten angegeben</span>`;
    }
    return zeiten.map(zeit =>
        `<div>
            <div><i class="fa-solid fa-calendar-days course-info-icon"></i>${zeit.tag}</div>
            <span><i class="fa-regular fa-clock course-info-icon"></i>${zeit.zeit}</span>
        </div >`
    ).join("<br>");
}

function createCourseLink(details) {
    if (details.includes("Ausgebucht")) {
        return '<p class="card-actions ausgebucht">Kurs Ausgebucht</p>';
    } else if (details.includes("Anmeldefrei")) {
        return '<p class="card-actions"><b><a href="#" class="book-course">Kurs Buchen <i class="fa fa-chevron-down"></i></a></b></p>';
    }
    return '<p class="card-actions ausgebucht">Kurs Ausgebucht</p>';
}

function renderCourses(courses) {
    const coursesContainer = document.querySelector(".coursecards-container");
    let courseCardsHTML = "";

    if (courses.length === 0) {
        courseCardsHTML = '<h5 class="no-courses-message">Keine Kurse gefunden.</h5>';
    } else {
        courses.forEach((course) => {
            const courseCard = createCourseCard(course);
            courseCardsHTML += courseCard;
        });
    }

    coursesContainer.innerHTML = courseCardsHTML;
}

export { renderCourses };


