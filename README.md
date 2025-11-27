# Sportangebot - Universität Bremen

## Projektbeschreibung

Dieses Projekt wurde im Rahmen des Studiengangs **Internationale Medieninformatik** an der Universität Bremen im Modul **Human Computer Interaction (HCI)** entwickelt. 

Das Projekt adressiert ein **Usability-Problem** auf der offiziellen Website der Universität Bremen, indem es die Darstellung und Filterung von Sportkursen erheblich verbessert.

## Problemstellung

Die ursprüngliche Website für das Sportangebot der Universität Bremen (https://www.buchsys.de/bremen/angebote/aktueller_zeitraum/kurssuche.html) wies erhebliche Usability-Probleme auf:

- Unübersichtliche Darstellung der Sportkurse
- Fehlende oder unzureichende Filterfunktionen
- Schwierige Navigation und Suche nach spezifischen Kursen
- Mangelnde visuelle Darstellung der Kursstandorte

## Lösung

Diese Webanwendung bietet eine moderne, benutzerfreundliche Lösung mit folgenden Verbesserungen:

### ✨ Hauptfunktionen

- **Verbesserte Kursdarstellung**: Übersichtliche Kartenansicht mit allen relevanten Kursinformationen
- **Erweiterte Filterfunktionen**: 
  - Filterung nach Kategorie
  - Filterung nach Zeit
  - Filterung nach Standort
  - Filterung nach Preis
- **Sortierfunktionen**:
  - Nach Kategorie
  - Nach Preis (niedrigster/höchster)
  - Alphabetisch (A-Z)
- **Suchfunktion**: Schnelle Suche nach Kursnamen oder Beschreibungen
- **Interaktive Karte**: Mapbox-Integration zur visuellen Darstellung der Kursstandorte
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile

## Technologien

- **HTML5**: Struktur und Semantik
- **CSS3**: Styling und Layout (modular organisiert)
- **JavaScript (ES6+)**: Interaktivität und Datenverarbeitung
- **Mapbox GL JS**: Interaktive Kartenvisualisierung
- **Turf.js**: Geodatenverarbeitung für Kartenfunktionen
- **Font Awesome**: Icons

## Projektstruktur

```
client/
├── doc/                          # Dokumentation
│   ├── project struktur.txt
│   └── umfrage.txt
├── src/
│   ├── assets/                   # Bilder und Medien
│   │   └── img/
│   ├── css/                      # Stylesheets (modular)
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── courseCard.css
│   │   ├── sidebar/
│   │   ├── filter-sort_btns/
│   │   └── ...
│   ├── data/                     # Daten
│   │   └── kurseData.json
│   ├── js/                       # JavaScript Module
│   │   ├── index.js
│   │   └── modules/
│   │       ├── data.js
│   │       ├── filters.js
│   │       ├── sort.js
│   │       ├── search_course.js
│   │       ├── courseCard.js
│   │       ├── mapbox/
│   │       └── setupUI/
│   ├── index.html
│   └── index.css
```

## Installation und Verwendung

### Voraussetzungen

- Ein moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Lokaler Webserver (optional, für lokale Entwicklung)

### Lokale Installation

1. Repository klonen oder herunterladen:
```bash
git clone [repository-url]
cd Sportangebot---Universit-t-Bremen
```

2. In den client-Ordner wechseln:
```bash
cd client/src
```

3. Dateien über einen lokalen Webserver bereitstellen:
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`
   - Oder einen anderen lokalen Webserver verwenden

4. Im Browser öffnen:
```
http://localhost:8000/index.html
```

### Online-Version

Die Anwendung ist live verfügbar unter:
**https://sportangebot-universit-t-bremen.vercel.app/**

## Features im Detail

### Filterfunktionen

- **Kategorie-Filter**: Filtert Kurse nach Sportarten (z.B. Fußball, Yoga, Schwimmen)
- **Zeit-Filter**: Filtert nach verfügbaren Zeiten
- **Standort-Filter**: Filtert nach Kursstandorten
- **Preis-Filter**: Filtert nach Preisbereichen

### Sortierfunktionen

- Sortierung nach verschiedenen Kriterien für bessere Übersichtlichkeit

### Kartenansicht

- Interaktive Karte mit allen Kursstandorten
- Marker für jeden Standort
- Zoom- und Navigationsfunktionen

### Responsive Design

- Optimiert für verschiedene Bildschirmgrößen
- Mobile-first Ansatz
- Touch-optimierte Bedienelemente

## Entwicklung

### Code-Organisation

Der Code ist modular aufgebaut:

- **data.js**: Datenverwaltung und -laden
- **filters.js**: Filterlogik
- **sort.js**: Sortierlogik
- **search_course.js**: Suchfunktionalität
- **courseCard.js**: Kurskarten-Rendering
- **mapbox/**: Kartenfunktionalität
- **setupUI/**: UI-Initialisierung

### CSS-Struktur

Die Stylesheets sind nach Komponenten organisiert:
- `header.css`: Header und Navigation
- `footer.css`: Footer
- `courseCard.css`: Kurskarten
- `sidebar/`: Sidebar-Komponenten
- `filter-sort_btns/`: Filter- und Sortier-Buttons

## Evaluation

Im Rahmen des HCI-Moduls wurden Usability-Tests durchgeführt:

- **Umfrage zur alten Website**: Bewertung der ursprünglichen Website
- **Umfrage zur neuen Website**: Evaluation der verbesserten Lösung

Die Ergebnisse wurden zur kontinuierlichen Verbesserung der Anwendung verwendet.

## Autoren

Entwickelt im Rahmen des Moduls **Human Computer Interaction** im Studiengang **Internationale Medieninformatik** an der **Universität Bremen**.

## Lizenz

Dieses Projekt wurde für akademische Zwecke entwickelt.

## Kontakt

Bei Fragen oder Anmerkungen zum Projekt:
- Universität Bremen
- Studiengang: Internationale Medieninformatik
- Modul: Human Computer Interaction

## Changelog

### Version 1.0
- Initiale Implementierung
- Filter- und Sortierfunktionen
- Kartenintegration
- Responsive Design
- Verbesserte Kursdarstellung

---

**Hinweis**: Dieses Projekt wurde im Rahmen einer akademischen Arbeit entwickelt und dient der Verbesserung der Usability der Sportangebot-Website der Universität Bremen.

