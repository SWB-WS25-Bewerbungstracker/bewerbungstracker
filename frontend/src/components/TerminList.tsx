import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { parseDatePassed } from "../functions/parseDateFromIso";
import axios from "axios"; // für HHTP Requests( PUT, GET, etc.)
import { useEffect, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Save, Delete } from "@mui/icons-material";
import { getLang} from "../functions/getLanguage";
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import dayjs, { Dayjs } from "dayjs";
import {Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { useOverviewOfAllJoboffers } from "../functions/getAllJoboffersForOverview";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const Lang=getLang();


//*************** Toolbar function ****************

function CustomToolbar({onAddClick}:{onAddClick:()=>void}){
    return(
        <Box sx ={{
            justifyContent: "flex",
            display:"flex",
            alignItems: "center",
            padding: 1
        }}>
            <Button variant="contained" onClick={onAddClick}>+ Hinzufügen</Button>
        </Box>
    )
}

//**************** INTERFACE *************************
export interface terminListProps{
    id : number,
    datum : Date | string,
    uhrzeit: string,
    firmaName? : string,
    terminName? : string,
    toDo? : string,
    contact? : string,
}

export interface BackendTermin {
    appointmentID: number,
    appointmentdate: string,
    appointmentname: string,
    jobofferID: number,
    joboffername: string,
    companyname: string,
}



const TerminList: React.FC = () => {

    // Datum Input speichern (kopie aus AddAppointment)
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    // Zeit Input speichern
    const [time, setTime] = useState<Dayjs | null>(dayjs());

    //********** onChange Handler ************
    const onDateChange =(newDate:Dayjs | null) => setDate(newDate);
    const onTimeChange =(newTime:Dayjs | null) => setTime(newTime);


    //************ const für Popup "Hinzufügen"
    const [open, setOpen] = useState(false);
    const handleOpen= ()=> setOpen(true)
    const handleClose= ()=> setOpen(false)

    //***************** const für dropdown in Hinzufügen *************
    const [selectedJoboffer, setSelectedJoboffer]= useState<number | "">("");
    const handleJobofferChange = (event:React.ChangeEvent<{value: unknown}>) =>{
        setSelectedJoboffer(event.target.value as number);
    };
    const{listOfJoboffers, loading, error} = useOverviewOfAllJoboffers();

    const [rows, setRows] = useState<terminListProps[]>([])
    const columns: GridColDef<(typeof rows)[number]>[] = [
        {   field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'firmaName',
            headerName: 'Unternehmen',
            maxWidth: 150,
            editable: false,
            align: 'left',
            renderCell: params => (
                <span style={{cursor:'default'}}>{params.value}</span>
            ),
        },
        {
            field: 'terminName',
            headerName: 'Terminart',
            width: 100,
            editable: true,
            align: 'left',
        },
        {
            field: 'datum',
            headerName: 'Datum',
            type: 'number',
            width: 110,
            editable: true,
            align: 'center',
            headerAlign: 'left',
        },
        {
            field: 'uhrzeit',
            headerName: 'Uhrzeit',
            type: 'number',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
        {
            field: 'toDo',
            headerName: 'To-Do',
            flex: 1, // soll die restliche Zeile auffüllen
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
    ];

// use Effect wird immer aufgerufen beim ersten rendern.
    useEffect(() => {
        axios   .get('http://localhost:8080/appointments')
            .then((response) =>
            {
                const today = new Date(); //erstellt ein neues Objekt mit dem heuigen Datum.

                const appointmentDataMapped = response.data
                    .map((t: BackendTermin): terminListProps => {
                        const parsed = parseDatePassed(t.appointmentdate);
                        return{
                            id: t.appointmentID,
                            datum: parsed[1],
                            uhrzeit: parsed[2],
                            firmaName: t.companyname,
                            terminName: t.appointmentname,
                            //oDo: t.oDo,
                            //contact: t.contact
                        };
                    })
                    //Filter erstellen, damit nur Termine Heute oder in Zukunft angezeigt werden
                    .filter((t: terminListProps) => {
                        const [day, month, year] = t.datum.split('.').map(Number); //trennt string bei jedem Punkt, wandelt dann string in Zahlen um
                        const date = new Date(year, month - 1, day);
                        return date >= today;
                    })


                setRows(appointmentDataMapped)
            });
    },[]);



    return (
        <Box sx={{ height: 370, width: '100%' }}>
            <DataGrid
                sx={{ background: 'transparent',

                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'transparent',
                    },

                    '& .MuiDataGrid-columnHeader': {    //die einzelnen überschriften
                        backgroundColor: 'transparent',
                        color: 'black',

                    },


                    '& .MuiDataGrid-row': {
                        marginBottom: '0px',
                        '&:hover': {
                            backgroundColor: 'lightblue'  // Beispiel-Hover-Farbe
                        }
                    },

                    '& .MuiDataGrid-row:last-child': {
                        marginBottom: 0,
                    },

                }}
                rows={rows}
                columns={columns}
                columnVisibilityModel={{ id: false }}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                slots={{ toolbar:()=> <CustomToolbar onAddClick={handleOpen}/> }}
                showToolbar
            />
            <Dialog open={open}
                    onClose={handleClose}
                    PaperProps={{sx:{minWidth:10, minHeight:10,}
                    }}>
                <DialogTitle>Neuer Termin</DialogTitle>
                <DialogContent>
                                            {/* hier muss margin top 1 gemacht werden, damit die schrift nicht abgeschnitten wird*/}
                    <FormControl fullWidth sx={{marginTop:1}}>
                        <InputLabel id="company-selected-label">Firma - Bewerbung</InputLabel>
                        <Select
                            labelID="company-selected-label"
                            value={selectedJoboffer}
                            label="Firma - Bewerbung"
                            onChange={handleJobofferChange}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200,
                                        width:200
                                    },
                                },
                            }}>
                            {loading?(
                                <MenuItem disabled>Lade Daten...</MenuItem>
                            ):error ?(
                                <MenuItem disabled>Der code ist perfekt. DU hast mist gebaut...</MenuItem>
                            ): (
                                listOfJoboffers
                                    .slice()
                                    .sort((a,b)=>a.companyName!.localeCompare(b.companyName!)) //sortiere dropdown alphabetisch nach company name
                                    .map((offer)=>(
                                   <MenuItem key={offer.jobofferId} value={offer.jobofferId}>
                                       {offer.companyName} - {offer.jobofferName}
                                   </MenuItem>
                                ))
                            )
                            }
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Lang}>
                        <Box sx={{display:"flex", marginTop:2, gap:2}}>
                            <DatePicker
                                label="Datum"
                                value={date}
                                onChange={onDateChange}
                            />
                            <TimePicker
                            label="Uhrzeit"
                            value={time}
                            onChange={onTimeChange}
                            />
                        </Box>
                    </LocalizationProvider>

                </DialogContent>
            </Dialog>

        </Box>
    );
}
export default TerminList;
