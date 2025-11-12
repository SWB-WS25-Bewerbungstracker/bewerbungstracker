// https://mui.com/x/react-date-pickers/date-calendar/#basic-usage
// https://mui.com/x/react-date-pickers/adapters-locale/
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import 'dayjs/locale/de';

export default function CalendarAllDates() {
  return (
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
        </LocalizationProvider>
      </div>);
}