export interface Appointment {
  appointmentId?: number | string;
  appointmentDate: string;
  appointmentName: string;
}

/* ----------------------------------Funktionen zum Arbeiten mit Iso-Timestamps---------------------------------- */

// Funktion, um ein Iso-Timestamp in die Komponenten Wochentag, Datum und Uhrzeit zu zerlegen (basierend auf KI Vorschlag(?))
export function parseDateFromIso(isoDate: string): string[] | null {
  // Funktioniert nur für Iso-Timestamps
  if (isoDate) {
    // Aus dem Iso-Timestamp ein Datum-Objekt erstellen
    const date = new Date(isoDate);
    // Wockentag abrufen
    const dayPart = date.toLocaleDateString("de-DE", {
      weekday: "long",
    });
    // Datum abrufen in dd.mm.yyyy
    const datePart = date.toLocaleDateString("de-DE", {
      year: "numeric", // Vollständiges Jahr, ansonsten auch "2-digit" verwenden
      month: "2-digit",
      day: "2-digit",
    });
    // Uhrzeit abrufen in HH:MM
    const timePart = date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return [dayPart, datePart, timePart];
  } else {
    return null;
  }
}

// Funktion, um ein Datum in einen String für den nächsten Termin umzuwandeln
export function parseDateToNextAppointmentString(
  passedDate?: string
): string | undefined {
  // Versuchen, die Rückgabewerte der parseDatePassed-Funktion zu entpacken, falls dieser existiert
  if (passedDate) {
    const result = parseDateFromIso(passedDate);

    // Überprüfen, ob das Ergebnis ein Array ist und es entpacken
    if (result && result.length === 3) {
      const [dayPart, datePart, timePart] = result;

      // Wenn alle Teile vorhanden sind, erstelle den Terminstring
      return `Nächster Termin: am ${dayPart} den ${datePart} um ${timePart} Uhr`;
    } else {
      // Wenn das Ergebnis nicht gültig ist, gib einen leeren String zurück
      return "";
    }
  }
}

// Funktion, um ein Datum in einen String umzuwandeln
export function parseDateToString(passedDate?: string): string | undefined {
  // Versuchen, die Rückgabewerte der parseDatePassed-Funktion zu entpacken, falls dieser existiert
  if (passedDate) {
    const result = parseDateFromIso(passedDate);

    // Überprüfen, ob das Ergebnis ein Array ist und es entpacken
    if (result && result.length === 3) {
      const [dayPart, datePart, timePart] = result;

      // Wenn alle Teile vorhanden sind, erstelle den Terminstring
      return `${dayPart} der ${datePart} um ${timePart} Uhr`;
    } else {
      // Wenn das Ergebnis nicht gültig ist, gib einen leeren String zurück
      return "";
    }
  }
}

/* ----------------------------------Funktion zum Entfernen der Ids neu erstellter Termine ---------------------------------- */

export function removeIdForNewAppointments(
    tmpAppointments: Appointment[]
): Appointment[] {
    console.debug("Funktion zum Entfernen neuer Appointment Ids aufgerufen");
    if (!tmpAppointments) {
        console.debug("Keine Appointments gefunden");
        return [];
    } else {
        return tmpAppointments.map(({appointmentId, ...rest}) => {
            //If appointment is new only return the data without id
            if(appointmentId && /^new_/.test(appointmentId as string)){
                return rest;
            }
            return {appointmentId, ...rest};
        });
    }
}