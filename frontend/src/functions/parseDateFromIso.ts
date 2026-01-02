/* Dieses Modul ist inzwischen redundant (siehe parseDate.tsx), 
wird aber erstmal noch weiter bestehen, um keine Fehler bei Funktionsaufrufen dieser Funktion zu verursachen */
export function parseDatePassed(isoDate: string): string[] | null {
  if (isoDate) {
    const date = new Date(isoDate);
    const dayPart = date.toLocaleDateString("de-DE", {
      weekday: "long",
    });
    const datePart = date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const timePart = date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return [dayPart, datePart, timePart];
  } else {
    return null;
  }
}
