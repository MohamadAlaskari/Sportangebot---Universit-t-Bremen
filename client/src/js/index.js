import { loadKurseData } from './modules/data.js';

async function init() {
  try {
    // Laden der Kursdaten
    const kurse = await loadKurseData();

    // Verarbeiten und Anzeigen der Kursdaten
    // Zum Beispiel könnten Sie die Kursdaten hier in das DOM einfügen
    // oder sie für weitere Verarbeitungsschritte verwenden.
    console.log(kurse); // Beispiel: Ausgabe der Kursdaten in der Konsole
  } catch (error) {
    console.error("Fehler beim Initialisieren der Anwendung:", error);
    // Geeignete Fehlerbehandlung durchführen
  }
}

// Initialisierung der Anwendung
init();
