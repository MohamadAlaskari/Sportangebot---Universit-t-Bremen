document.addEventListener("click", function (event) {
    if (event.target.classList.contains("more-link")) {
      event.preventDefault();
      const courseId = event.target.dataset.id;
      const longDescription = document.getElementById(`moreDescription-${courseId}`);
      
      if (longDescription) {
        longDescription.classList.toggle("show"); 
      }
    }
  });
  

  //get Short And Long Description
  function getShortAndLongDescription(description) {
      if (description.length > 90) {
          const shortDescription = description.substring(0, 90) ;
          const longDescription = description.substring(90);
          return { shortDescription, longDescription };
      } else {
          return { shortDescription: description, longDescription: "" };
      }
  }


function createCourseCard(kurs) {

    const { shortDescription, longDescription } = getShortAndLongDescription(kurs.beschreibung);
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
                <h1>${kurs.titel} für <span id="zielGruppe">${kurs.zielgruppe}</span></h1>
                <h2>${kurs.kategorie}</h2>
                <p class="course-description">${shortDescription}
                    <span id="moreDescription-${kurs.nummer}" class="long-description">
                        ${longDescription}
                    </span>${readMoreLink}
                    </p>
                    <hr>
  
                <div class="card-block course-info">
                    <div class="card-course-info">
                        ${zeitenStrings}
                    </div>
  
                    <div class="card-course-info">
                        <span><i class="fa-solid fa-location-dot"></i>  ${kurs.map[0].ort} </span>
                         
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

export {  createCourseCard }
