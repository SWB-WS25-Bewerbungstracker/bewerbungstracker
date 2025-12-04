// https://mui.com/x/react-date-pickers/date-calendar/#basic-usage
// https://mui.com/x/react-date-pickers/adapters-locale/
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Tooltip } from "@mui/material";

import 'dayjs/locale/de';
import 'dayjs/locale/en';

import axios from 'axios';
import { useEffect, useState } from "react";
import {parseDatePassed} from "../functions/parseDateFromIso.tsx";
/***************************
 der Standard Kalender von MUI rendert jeden Tag die interne Komponente PickersDay.
 PickersDay bekommtProps wie z.B. select, disable etc aber auch day (das angezeigte Datum).
 dieses day ersetzen wir mit den Komponenten aus der Datenbank. dafür ersetzen wir mit slots={{day: AppointmentDate}}
 day durch unsere Komponente. in unserer Komponente rufen wir das PickersDay auf und können dort die Darstellung von jedem
 Tag individuell anpassen.
****************************/
interface CalendarDate{
    datum: string,
    terminName: string,
    firmaName: string,
    uhrzeit: string,
}

function AppointmentDate(props: any) {
    const { day, events = [], ...other} = props; //...other übergibt alle übrigen Props ohne manuell zu übergeben

    const dateStr = day.format("YYYY-MM-DD"); //das Datum 'day' ins richtige Format bringen
    const hasEvent = events.some((e: CalendarDate) => e.datum === dateStr); //event.some() prüft ob minfdestens ein Event in events am aktuellen Datum ist

    // Nur Events dieses Tages um einen Text für hover zu bekommen
    const dayEvents = events.filter((ev: CalendarDate) => ev.datum === dateStr);
    const hoverText = dayEvents
        .map(ev => `${ev.firmaName} - (${ev.uhrzeit}) ${ev.terminName} `)

    return (
        <Tooltip // erstellt bim Hovern ein Hiweisfenster mit dem Inhalt hoverText
        title={hasEvent ? hoverText :""}
        arrow
        placement="top"
        >
        <PickersDay     // stellt einen einzelnen Tag im Kalender dar
            {...other}  //auch hier, alle Props an PickersDay übergeben ohne sie nochmal in day oder events zu entpacken
            day={day}
            sx={{
                backgroundColor: hasEvent ? "orange" : undefined,
                color: hasEvent ? "white" : undefined,
                borderRadius: "8px",
                '&:hover': {
                    backgroundColor: 'lightblue'  // Beispiel-Hover-Farbe

                }
            }}
            />
        </Tooltip>

    );
}

export default function CalendarAllDates() {
    const Lang = navigator.language.startsWith('en') ? 'en' : 'de'; //Liest Sprache vom browser für Kalender layout
    const [events, setEvents] = useState<CalendarDate[]>([]);

    //Wenn möglich extern lagern um daten nur einmal aufrufen zu müssen
    useEffect(()=>{
        axios   .get('http://localhost:8080/appointments')
                .then((response) =>{
                    const mappedCalemndar = response.data
                        .map((t: any)=>{
                        const parsed = parseDatePassed(t.appointmentdate);
                        return{
                            datum: t.appointmentdate.split("T")[0], //Teilt an 'T' in datum und Uhrzeit in array mit [0] wird datum abgerufen. [1] ist der 2. Teil im array also Uhrzeit
                            uhrzeit: parsed[2],
                            terminName: t.appointmentname,
                            firmaName: t.companyname,
                        }
                    });
                    setEvents(mappedCalemndar);
                });
    },[]);
//

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Lang}>
            <Box sx={{ width: '100%', height: '100%', background:'' }}>
                <DateCalendar
                    showDaysOutsideCurrentMonth
                    fixedWeekNumber={6}
                    slots={{day: AppointmentDate}} // slots ersetzt day komponent vom Kalender durch AppointmentDate komponente
                    slotProps={{
                        day:{events: events} //Liefert Prop "events" mit an an AppointmentDate
                    }}
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '',
                        borderRadius: '8px',  //ecken abrunden
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
}
