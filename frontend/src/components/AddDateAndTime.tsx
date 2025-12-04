import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc"; // KI: Das utc-Plugin importieren
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Paper, Stack, TextField } from "@mui/material";
import TestButtonGroup from "./TestButtonGroup";
import { Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { Appointment } from "../functions/getJobofferById";

// KI: die Komponente als externes Modul nutzbar machen
export interface AddDateAndTimeProps {
  // Speichern des Termins
  onSave: (appointment: Appointment, index?: number) => void;
  // KI: Terminbearbeitung möglich machen :
  // Flag, das angibt, ob ein bestehender Termin bearbeitet wird
  editMode: boolean;
  // bestehende Daten verwenden, falls vorhanden (z.B. fürs Bearbeiten)
  appointmentData?: Appointment | null;
  // Termin löschen ermöglichen (für spätere Implementierung)
  onDelete?: () => void;
  index?: number | null;
}

// Komponente, die seperate Datum und Zeiteingabe erlaubt und diese kombiniert
const AddDateAndTime: React.FC<AddDateAndTimeProps> = ({
  onSave,
  editMode,
  appointmentData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDelete, // (für spätere Implementierung)
  index,
}: AddDateAndTimeProps) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateAndTime, setDateAndTime] = useState<Dayjs | null>(null); // Wird verwendet, aber in if-Bedingung
  const [appointmentName, setAppointmentName] = useState<string>("");

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
    if (newDate) {
      setDate(newDate);
    }
  };

  // Speichern der eingegebenen Zeit
  const onTimeChange = (newTime: Dayjs | null) => {
    if (newTime) {
      setTime(newTime);
    }
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

    // Wenn nur die Zeit eingegeben wurde, soll das aktuelle Datum dazu genommen werden
    if (!date && time) {
      combinedDateAndTime = combinedDateAndTime
        .set("hour", time.hour())
        .set("minute", time.minute())
        .set("second", 0);
    }

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

    // Wenn Zeit und Datum eingegeben wurde, werden die Werte aus beidem kombiniert
    if (date && time) {
      combinedDateAndTime = combinedDateAndTime
        .set("year", date.year())
        .set("month", date.month())
        .set("date", date.date())
        .set("hour", time.hour() + 1)
        .set("minute", time.minute())
        .set("second", 0);
    }

    // Speichern des kombinierten Werts im State
    setDateAndTime(combinedDateAndTime);

    // KI: Speichern des kombinierten Werts und Senden an die Hauptkomponente
    onSave({
      appointmentId:
        appointmentData?.appointmentId || (index ? "new_" + index : ""),
      appointmentDate: combinedDateAndTime.toISOString(),
      appointmentName,
    });
  };

  return (
    <Paper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <DatePicker
            fixedWeekNumber={6}
            label="Datum"
            name="Date"
            value={date}
            onChange={onDateChange}
          />
          <TimePicker
            label="Zeit"
            value={time}
            ampm={false}
            onChange={onTimeChange}
          />
          <TextField // Darstellung
            sx={{ m: 1, width: "98%" }}
            id="DateName"
            label="Terminname"
            variant="outlined"
            // Zuweisung der Daten für Übergabe
            name="dateName"
            value={appointmentName}
            onChange={onAppointmentNameChange}
            // Input
            slotProps={{
              input: {},
            }}
          />
          <Box /* um die Höhe des Buttons zu beschränken */>
            <TestButtonGroup
              buttons={[
                {
                  label: "",
                  icon: <Save />,
                  iconPosition: "start",
                  onClick: () => {
                    combineDateAndTime();
                  },
                },
              ]}
            />
          </Box>
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
};

export default AddDateAndTime;
