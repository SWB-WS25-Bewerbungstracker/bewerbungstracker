import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Tooltip, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import type { PickersDayProps } from "@mui/x-date-pickers/PickersDay";

import { parseDateFromIso } from "../functions/parseDateFromIso";
import applicationTrackerApi from "../services/api.ts";
import { getLang } from "../functions/getLanguage";

import "dayjs/locale/de";
import "dayjs/locale/en";


interface CalendarDate {
  datum: string;
  terminName: string;
  firmaName: string;
  uhrzeit: string;
}
interface AppointmentDayProps extends PickersDayProps{
    events?: CalendarDate[];
}

function AppointmentDate(props: AppointmentDayProps) {
  const { day, events = [], outsideCurrentMonth, ...other} = props; //...other übergibt alle übrigen Props ohne manuell zu übergeben
  const dateStr = day.format("YYYY-MM-DD"); //das Datum 'day' ins richtige Format bringen
  const hasEvent = events.some((e: CalendarDate) => e.datum === dateStr); //event.some() prüft ob minfdestens ein Event in events am aktuellen Datum ist
  const dayEvents = events.filter((ev: CalendarDate) => ev.datum === dateStr);
  const hoverText = dayEvents.map(
    (ev) => `${ev.firmaName} - (${ev.uhrzeit}) ${ev.terminName} `,
  );

    return (
        <Tooltip // erstellt bim Hovern ein Hiweisfenster mit dem Inhalt hoverText
        title={hasEvent ? hoverText :""}
        arrow
        placement="top"
        >
        <PickersDay
            {...other}
            day={day}
            outsideCurrentMonth = {outsideCurrentMonth}
            sx={{
                color: outsideCurrentMonth ? 'text.disabled' : hasEvent ? 'white' : undefined,
                backgroundColor: hasEvent ? "primary.main" : "transparent",
                borderRadius: "8px",
                "&:hover": {backgroundColor:hasEvent ? "primary.dark":"action.hover"},
            }}
            />
        </Tooltip>

    );
}

export default function CalendarAllDates() {
  const Lang = getLang(); //Liest Sprache vom browser für Kalender layout
  const [events, setEvents] = useState<CalendarDate[]>([]);
  //Wenn möglich extern lagern um daten nur einmal aufrufen zu müssen
  useEffect(() => {
    applicationTrackerApi
      .get("http://localhost:8080/appointments")
      .then((response) => {
        const mappedCalemndar = response.data.map((t: any) => {
          const parsed = parseDateFromIsO(t.appointmentdate) as string[];
          return {
            datum: t.appointmentdate.split("T")[0],
            uhrzeit: parsed[2],
            terminName: t.appointmentname,
            firmaName: t.companyname,
          };
        });
        setEvents(mappedCalemndar);
      });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Lang}>
      <Paper
        sx={{
          width: "100%",
          display: "inline-block",
          background: "",
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "8px",
        }}
      >
      <Paper sx={{ width: "100%", display:"inline-block",border: "1px solid",borderColor:"primary.main", borderRadius: "8px", }}>
        <DateCalendar
          dayOfWeekFormatter={(day) => day.format("ddd")}
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
            //Mui rendert standartmäßig Pickersday. hier ersetzt durch slots um events mit reinbringen zu können.
          slots={{ day: AppointmentDate }}
          slotProps={{
            day: { events, } as AppointmentDayProps //Liefert Prop "events" mit an an AppointmentDate
          }}
          sx={{
            width: "100%",
            flex:1,
              display:"flex",
              flexDirection:"column",
            borderRadius: "8px",
              "& .MuiDayCalendar-weekContainer": {
                  display: "flex",
                  flex:1,
              },
              "& .MuiPickersDay-root": {
              flex:1,
              aspectRatio:"1/1",
              maxWidth: "unset",
              },
              "& .MuiDayCalendar-header": {
                  display: "flex",
                  width:"100%",
              },
              "& .MuiDayCalendar-weekDayLabel": {
                  border: "2px solid",
                  borderColor:"primary.main",
                  borderRadius:"8px",
                  flex: 1,
                  textAlign: "center",
              },
          }}
        />
      </Paper>
    </LocalizationProvider>
  );
}
