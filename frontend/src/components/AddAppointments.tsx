import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import TestButtonGroup from "./TestButtonGroup";
import { Save, Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { parseDateToString, type Appointment } from "../functions/parseDate";
import { getLang} from "../functions/getLanguage";
import 'dayjs/locale/de';
import 'dayjs/locale/en';

// KI: die Komponente als externes Modul nutzbar machen
export interface AddDateAndTimeProps {
  // Liste bestehender Termine falls vorhanden
  appointments: Appointment[];
  // KI: Callback für Änderungen an den Terminen
  // -> Änderungen werden an die übergeordnete Komponente gemeldet
  onAppointmentChange: (appointments: Appointment[]) => void;
}
//Sprache des Browsers auslesen und in Lang speichern
const Lang=getLang();

// Komponente, die seperate Datum und Zeiteingabe erlaubt und diese kombiniert
const AddAppointments: React.FC<AddDateAndTimeProps> = ({
  appointments,
  onAppointmentChange,
}: AddDateAndTimeProps) => {
  // Datum Input speichern
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  // Zeit Input speichern
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  // Terminname speichern
  const [appointmentName, setAppointmentName] = useState<string>("");
  // Flag: soll bearbeitet oder gespeichert werden?
  const [editMode, setEditMode] = useState<boolean>(false);
  // einzelner Termin mit dem gearbeitet wird
  const [appointmentData, setAppointmentData] = useState<Appointment | null>(
    null
  );

  // KI: Aktiviere das UTC-Plugins
  dayjs.extend(utc);
  /* BUG: Durch die Sommer-/Winterzeit kam es zur falschen Zeitzuweisung,
   * es wurde immer 1 Stunde früher gespeichert als eingegeben war.
   * FIX: UTC-Plugin verwenden */

  // KI: Wenn im Bearbeitungsmodus, dann initialisiere die Felder mit den bestehenden Werten
  useEffect(() => {
    if (editMode && appointmentData) {
      setDate(dayjs(appointmentData.appointmentDate));
      setTime(dayjs(appointmentData.appointmentDate));
      setAppointmentName(appointmentData.appointmentName);
    }
  }, [editMode, appointmentData]);

  // Speichern des eigegebenen Datums
  const onDateChange = (newDate: Dayjs | null) => {
    if (newDate) setDate(newDate);
  };

  // Speichern der eingegebenen Zeit
  const onTimeChange = (newTime: Dayjs | null) => {
    if (newTime) setTime(newTime);
  };

  // KI: Speichern des Termin-Namens
  const onAppointmentNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAppointmentName(event.target.value);
  };

  // Kombinieren der Datum und Zeiteingabe
  const combineDateAndTime = () => {
    // Wenn nicht eingegeben, dann null
    if (!date || !time) return null;
    // Standarwert: heute
    let combinedDateAndTime = dayjs();

    // Wenn nur das Datum eingegeben wurde, wird nur das gespeichert und die Zeit auf 00:00:00 gesetzt
    if (date && !time) {
      combinedDateAndTime = combinedDateAndTime
        .set("year", date.year())
        .set("month", date.month())
        .set("date", date.date())
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0);
    }

    // Wenn nur die Zeit eingegeben wurde, soll das aktuelle Datum dazu genommen werden
    if (!date && time) {
      combinedDateAndTime = combinedDateAndTime
        .set("hour", time.hour())
        .set("minute", time.minute())
        .set("second", 0);
    }

    // Wenn Zeit und Datum eingegeben wurde, werden die Werte aus beidem kombiniert
    if (date && time) {
      combinedDateAndTime = combinedDateAndTime
        .set("year", date.year())
        .set("month", date.month())
        .set("date", date.date())
        .set("hour", time.hour())
        .set("minute", time.minute())
        .set("second", 0);
    }

    // Übergeben des kombinierten Werts
    return combinedDateAndTime;
  };

  // Termin speichern oder bearbeiten
  const handleSave = () => {
    // KI Verbesserung:
    // Temporäre Kopie der Datum- und Zeiteingabe,
    // mit der weitergearbeitet werden kann, ohne das orginal zu ändern
    const combinedDateAndTime = combineDateAndTime();

    // Wenn eine Termineingabe existiert:
    if (combinedDateAndTime) {
      // dann daraus ein neues Appointment erstellen
      const newAppointment: Appointment = {
        appointmentId: appointmentData?.appointmentId || `new_${Date.now()}`, // KI Fehlerbehebung: Falls keine ID, neuen Termin anlegen
        appointmentDate: combinedDateAndTime.toISOString(),
        appointmentName,
      };

      // KI Tipp: Temporäre Variable, in die das neue Array an Appointments gespeichert wird,
      // welche später an die übergeordnete Komponente übergeben wird
      let updatedAppointments;

      // KI: Bearbeiten eines Termins
      if (editMode && appointmentData) {
        // KI: Bearbeiten eines bestehenden Termins = Termin ersetzen
        updatedAppointments = appointments.map(
          (apptointment) =>
            // Termine durchsuchen, bis Appointment mit gleicher Id des 'neuen' Appointments gefunden
            apptointment.appointmentId === appointmentData.appointmentId
              ? newAppointment // Wenn Termin mit gleicher ID schon existiert -> Termin ersetzen
              : apptointment // Ansonsten unverändert lassen
        );
      } else {
        // Neuen Termin hinten hinzufügen
        updatedAppointments = [...appointments, newAppointment];
      }

      // KI: Änderungen an die übergeordnete Komponente weitergeben
      onAppointmentChange(updatedAppointments);

      // Nach dem Speichern die Bearbeitungsflags zurücksetzen und die Termineingabe auch
      setEditMode(false);
      setAppointmentData(null);

      // Terminname zurücksetzen
      setAppointmentName(""); // Hier wird das Terminnamensfeld geleert

      // KI: Zurücksetzen des Datums und der Zeit
      setDate(dayjs()); // oder setDate(null), je nach gewünschtem Standard
      setTime(dayjs()); // oder setTime(null)
    }
  };

  // Markieren, dass Termin bearbeitet werden woll und festlegen welcher
  const handleEdit = (appointmentToEdit: Appointment) => {
    setEditMode(true);
    setAppointmentData(appointmentToEdit);
  };

  // KI: Termin löschen
  const handleDelete = (appointmentId: string | number) => {
    // Kopie aller Termine erstellen,
    // ausgenommen des zu entfernenden Termins
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.appointmentId !== appointmentId
    );
    // Termin entfernt und die Änderungen werden übergeben
    onAppointmentChange(updatedAppointments);
  };

  /* ----------------------------------Termin Input Formular---------------------------------- */

  return (
    <Paper>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Lang}>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <DatePicker
            fixedWeekNumber={6}
            label="Datum"
            value={date}
            onChange={onDateChange}
          />
          <TimePicker
            label="Zeit"
            value={time}
            ampm={false}
            onChange={onTimeChange}
          />
          <TextField
            // Darstellung
            sx={{ m: 1, width: "98%" }}
            id="DateName"
            label="Terminname"
            variant="outlined"
            // Zuweisung der Daten für Übergabe
            value={appointmentName}
            onChange={onAppointmentNameChange}
            slotProps={{
              input: {},
            }}
          />
          <Box>
            <TestButtonGroup
              buttons={[
                {
                  label: "",
                  icon: <Save />,
                  iconPosition: "start",
                  onClick: handleSave,
                },
              ]}
            />
          </Box>
        </Stack>

        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Hinzugefügte Termine:
        </Typography>
        {/* ---------------Anzeige der Termine--------------- */}
        {/* Wenn noch keine Termine hinzugefügt, das so erkennbar machen */}
        {appointments.length === 0 ? (
          <Typography variant="body2">
            Noch keine Termine hinzugefügt.
          </Typography>
        ) : (
          /* Wenn Termine hinzugefügt, dann diese als Liste anzeigen */
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index}>
                <Stack
                  direction={"row"}
                  spacing={1}
                  padding={1}
                  justifyContent={"space-between"}
                >
                  {/* Termin auflisten */}
                  <Typography variant="body1">
                    {`${appointment.appointmentName} - ${parseDateToString(
                      appointment.appointmentDate
                    )}`}
                  </Typography>
                  {/* Bearbeiten und Löschen für jeden Termin ermöglichen */}
                  <TestButtonGroup
                    buttons={[
                      /* Bearbeiten Button für jeden Termin anzeigen*/
                      {
                        label: "",
                        icon: <Edit />,
                        iconPosition: "start",
                        onClick: () => {
                          // Aufruf für den Bearbeitungsmodus
                          handleEdit(appointment); // Falls nötig, übergebe die Terminliste erneut
                        },
                      },
                      /* Löschen Button für jeden Termin anzeigen*/
                      {
                        label: "",
                        icon: <Delete />,
                        iconPosition: "start",
                        onClick: () => handleDelete(appointment.appointmentId),
                      },
                    ]}
                  />
                </Stack>
              </li>
            ))}
          </ul>
        )}
      </LocalizationProvider>
    </Paper>
  );
};

export default AddAppointments;
