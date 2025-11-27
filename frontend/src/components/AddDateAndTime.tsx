import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Paper, Stack } from '@mui/material';

export default function AddDateAndTime() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    const onDateChange = (newValue: Dayjs | null) => {
        if (newValue && value) {
            // Kombiniere das neue Datum mit der aktuellen Uhrzeit
            const updatedDate = value?.set('year', newValue.year())
                                    .set('month', newValue.month())
                                    .set('date', newValue.date());
            setValue(updatedDate);
    }
    }

    const onTimeChange = (newValue: Dayjs | null) =>{
        if (newValue && value) {
            // Kombiniere die aktuelle Uhrzeit mit dem Datum
            const updatedTime = value?.set('hours', newValue.hour())
                                    .set('minutes', newValue.minute());
            setValue(updatedTime);
    }
    }

    return (
        <Paper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction={"row"} spacing={2}>
                <DatePicker
                fixedWeekNumber={6}
                label="Datum"
                name="Date"
                value={value}
                onChange={onDateChange}
                />
                <TimePicker
                label="Zeit"
                value={value}
                ampm={false}
                onChange={onTimeChange}
                />
            </Stack>
        </LocalizationProvider>
        <h6> {value.toISOString()} </h6>
        </Paper>
        
        
    );
}