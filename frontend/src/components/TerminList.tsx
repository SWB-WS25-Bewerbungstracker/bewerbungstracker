import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { parseDatePassed } from "../functions/parseDateFromIso";
//import axios from "axios"; // für HHTP Requests( PUT, GET, etc.)
import applicationTrackerApi from "../services/api.ts";
import { useEffect, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {Save, Delete, Send} from "@mui/icons-material";
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
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useOverviewOfAllJoboffers } from "../functions/getAllJoboffersForOverview";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ButtonGroup from "./ButtonGroup.tsx";

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

//***************** Send Button function ***********************************

async function sendButtonClicked(date, time, appointmentName ,selectedJoboffer, closeDialog)
{
    if (!date || !time || !appointmentName || selectedJoboffer === "") {
        alert("BIDDÄÄÄ FÜLL ALLE FELDER AUS!!")
        return
    }

    const carrotForRabbit= date .hour(time.hour()) .minute(time.minute()) .second(0) .toISOString();

    console.log("Ich sende ans Backend:",{
        appointmentdate: carrotForRabbit,
        appointmentname: appointmentName,
        jobofferID: selectedJoboffer
    });

 /*   try{
        await axios.post("http://localhost:8080/MyRabbitWantsToSafeAppointment",{
            appointmentdate: carrotForRabbit,
            appointmentname: appointmentName,
            jobofferID: selectedJoboffer
        });

        closeDialog();
        window.location.reload();

    }   catch(err) {
            console.log(err)
            alert("Der Hase hat die Karotte nicht geliefert :(")
        }

  */
}


//**************** INTERFACE *************************
export interface terminListProps{
    id : number,
    datumSort: string, //datum als ISO string um soriteren zu können.
    datum : string,
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

//************ MUI Komponente mit einigen anpassungen beginnt ****************

const TerminList: React.FC = () => {

    // Datum Input speichern (kopie aus AddAppointment)
    const [date, setDate] = useState<Dayjs | null>(dayjs());  //ausgewähltes Datum
    // Zeit Input speichern
    const [time, setTime] = useState<Dayjs | null>(dayjs());   //ausgewählte Zeit

    //************* AppointmentName ****************
    const[appointmentName, setAppointmentName] = useState("");

    //********** onChange Handler für popup "Hinzufügen" ************
    const onDateChange =(newDate:Dayjs | null) => setDate(newDate);
    const onTimeChange =(newTime:Dayjs | null) => setTime(newTime);

    //************ const für Popup "Hinzufügen" *******************
    const [open, setOpen] = useState(false);
    const handleOpen= ()=> setOpen(true)
    const handleClose= ()=> setOpen(false)

    //***************** const für dropdown in Hinzufügen *************
    const [selectedJoboffer, setSelectedJoboffer]= useState<number | "">(""); //Ausgewähltes Jobangebot

    //hier wird das array erstellt für Popup um alle daten anzuzeigen
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
            //Problem: datum kann nicht sortiert werden, wenn es parsed ist. also speichern wir datumSort als original ISO und lassen es dann danach Sortieren,
            //aber rendern die Zelle trotzdem mit datum, was das parsed Datum ist.
            field: 'datumSort',
            headerName: 'Datum',
            renderCell: (params)=> params.row.datum,
            type: 'string',
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
            sortable: false,
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
        applicationTrackerApi
            .get('/appointments')
            .then((response) =>
        {
            const today = new Date(); //erstellt ein neues Objekt mit dem heuigen Datum.

                const appointmentList = response.data
                    .map((t: BackendTermin): terminListProps => {
                        const parsed = parseDatePassed(t.appointmentdate);
                        return{
                            id: t.appointmentID,
                            datumSort: t.appointmentdate,
                            datum: parsed?.[1]??'',     //hier mache ich selben fix wie bei list unten. falls parsed[1/2] null/undefiined ist schreiben wir ein leeres array
                            uhrzeit: parsed?.[2]??'',
                            firmaName: t.companyname,
                            terminName: t.appointmentname,
                            //oDo: t.oDo,
                            //contact: t.contact
                        };
                    })
                    //Filter erstellen, damit nur Termine Heute oder in Zukunft angezeigt werden
                    .filter((t: terminListProps) => {
                        const [day, month, year] = (t.datum as string).split('.').map(Number); //trennt string bei jedem Punkt, wandelt dann string in Zahlen um
                        const date = new Date(year, month - 1, day);
                        return date >= today;
                    })


                setRows(appointmentList)
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
                getRowId={(row)=>row.id}
                columnVisibilityModel={{ id: false }}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                    sorting: {                  //wir initialisieren die Tabelle am anfang Sortiert nach Terminen
                        sortModel: [
                            {field: 'datumSort', sort: 'asc'}
                        ]
                    }
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                slots={{ toolbar:()=> <CustomToolbar onAddClick={handleOpen}/> }}
                showToolbar
            />


            <Dialog open={open}
                    onClose={handleClose} //wenn man neben das Fenster klickt, schließt sich das Fenster
                    PaperProps={{sx:{minWidth:10, minHeight:10,}
                    }}>
                <DialogTitle>Neuer Termin</DialogTitle>
                <DialogContent>

                    <FormControl fullWidth sx={{marginTop:1}}>
                        <InputLabel id="companySelect">Firma - Bewerbung</InputLabel>
                        <Select
                            labelId="companySelect"
                            value={selectedJoboffer}
                            label="Firma - Bewerbung"
                            onChange={(event)=>setSelectedJoboffer(event.target.value as number)}
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
                                (listOfJoboffers??[]) // fix: wir schauen ob listOfJoboffers NULL/undefined ist. wenn nicht nutzen wir es. wenn doch, geben wir leeres array.
                                    .slice()                    //hier machen wir eine Kopie um original array nicht zu ändern... und sortieren anschließend mit .sort alphgabeetisch für die ausgabe
                                    .sort((a,b)=>a.companyName!.localeCompare(b.companyName!)) //sortiere dropdown alphabetisch nach company name
                                    .map((offer)=>(
                                   <MenuItem key={offer.jobofferId} value={offer.jobofferId}> {/*Joboffer ID ist einzigartig also nutzzen wir ihn als key und value sagt: das ist die ID für selectedJoboffer... also welches Jobangebot wurde ausgewählt*/}
                                       {offer.companyName} - {offer.jobofferName}             {/*das ist, was im Feld steht*/}
                                   </MenuItem>
                                ))
                            )
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{marginTop:1}}>
                        <InputLabel id="appointmanetName"></InputLabel>
                        <TextField
                            label="appointmentName"
                            value={appointmentName}
                            onChange={(rabbit)=>setAppointmentName(rabbit.target.value)}

                        />
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
                    <Box sx={{display:"flex", justifyContent: "center", marginTop:1}}>
                        <ButtonGroup
                            buttons={[
                                {
                                    label: "Senden",
                                    icon: <Send />,
                                    iconPosition: "end",
                                    onClick: () => {
                                        sendButtonClicked(date,time,appointmentName,selectedJoboffer,handleClose);
                                    },
                                },
                            ]}
                        />
                    </Box>
                </DialogContent>
            </Dialog>

        </Box>
    );
}
export default TerminList;
