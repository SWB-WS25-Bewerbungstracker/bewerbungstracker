// https://mui.com/x/react-date-pickers/date-calendar/#basic-usage
// https://mui.com/x/react-date-pickers/adapters-locale/
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';

import 'dayjs/locale/de';
import 'dayjs/locale/en';

export default function CalendarAllDates() {
    const Lang = navigator.language.startsWith('en') ? 'en' : 'de';
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Lang}>
            <Box sx={{ width: '100%', height: '100%', background:'' }}>
                <DateCalendar
                    showDaysOutsideCurrentMonth
                    fixedWeekNumber={6}
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
