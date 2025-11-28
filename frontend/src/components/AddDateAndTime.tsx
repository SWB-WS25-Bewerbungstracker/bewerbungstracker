import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';  // KI: Das utc-Plugin importieren
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Paper, Stack } from '@mui/material';
import TestButtonGroup from './TestButtonGroup';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

// KI: die Komponente als externes Modul nutzbar machen
export interface AddDateAndTimeProps {
    onSave: (combinedDate: string) => void; // Callback-Prop, um das kombinierte Datum zurückzugeben
}

// Komponente, die seperate Datum und Zeiteingabe erlaubt und diese kombiniert
const AddDateAndTime: React.FC<AddDateAndTimeProps> = ({ onSave }) =>  {
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [time, setTime] = useState<Dayjs | null>(dayjs());
    const [dateAndTime, setDateAndTime] = useState<Dayjs | null>(null);

    // KI: Aktiviere das UTC-Plugins
    dayjs.extend(utc);
    /* BUG: Durch die Sommer-/Winterzeit kam es zur falschen Zeitzuweisung, 
     * es wurde immer 1 Stunde früher gespeichert als eingegeben war. 
     * FIX: UTC-Plugin verwenden */

    // Speichern des eigegebenen Datums
    const onDateChange = (newDate: Dayjs | null) => {
        if (newDate) {
            setDate(newDate);
    }
    }

    // Speichern der eingegebenen Zeit
    const onTimeChange = (newTime: Dayjs | null) =>{
        if (newTime) {
            setTime(newTime);
    }
    }

    // Kombinieren der Datum und Zeiteingabe
    const combineDateAndTime = () => {
        // Wenn nicht eingegeben, dann null
        if (!date || !time) return null;

        // Standarwert: heute
        let combinedDateAndTime = dayjs();
        
        // Wenn nur die Zeit eingegeben wurde, soll das aktuelle Datum dazu genommen werden
        if (!date && time) {
            combinedDateAndTime = combinedDateAndTime
            .set('hour', time.hour())
            .set('minute', time.minute())
            .set('second', 0);       
        }

        // Wenn nur das Datum eingegeben wurde, wird nur das gespeichert und die Zeit auf 00:00:00 gesetzt
        if (date && !time) {
            combinedDateAndTime = combinedDateAndTime
            .set('year', date.year())
            .set('month', date.month())
            .set('date', date.date())
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0);       
        }

        // Wenn Zeit und Datum eingegeben wurde, werden die Werte aus beidem kombiniert
        if (date && time) {
            combinedDateAndTime = combinedDateAndTime
            .set('year', date.year())
            .set('month', date.month())
            .set('date', date.date())
            .set('hour', time.hour()+1)
            .set('minute', time.minute())
            .set('second', 0);
        }
        
        // Speichern des kombinierten Werts im State
        setDateAndTime(combinedDateAndTime); 

        // KI: Die kombinierte Zeit als ISO-String an die übergeordnete Komponente zurückgeben
        onSave(combinedDateAndTime.toISOString());

    }

    return (
        <Paper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction={"row"} spacing={2} alignItems={'center'}>
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
                <Box /* um die Höhe des Buttons zu beschränken */>
                    <TestButtonGroup buttons={[
                        { label: "Hinzufügen", icon: < Add/>, iconPosition: 'start', onClick: () => { combineDateAndTime(); } }
                    ]} />
                </Box>
                
            </Stack>
        </LocalizationProvider>
        </Paper>   
    );
}

export default AddDateAndTime;