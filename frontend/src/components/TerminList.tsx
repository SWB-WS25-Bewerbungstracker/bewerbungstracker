import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { parseDatePassed } from "../functions/parseDateFromIso";
//import axios from "axios"; // für HHTP Requests( PUT, GET, etc.)
import applicationTrackerApi from "../services/api.ts";
import { useEffect, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Delete, Send } from "@mui/icons-material";
import { getLang } from "../functions/getLanguage";
import "dayjs/locale/de";
import "dayjs/locale/en";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useOverviewOfAllJoboffers } from "../functions/getAllJoboffersForOverview";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomButtonGroup from "../components/ButtonGroup";
import {  Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {sendButtonClicked} from "../functions/sendAppointments.ts";
const Lang = getLang();

//*************** Zeug für Dialog ****************
interface TerminListProps {
    open: boolean;
    handleClose: () => void;
}


//**************** INTERFACE *************************
export interface terminListProps {
  id: number;
  //datumSort: string; //datum als ISO string um soriteren zu können.
  datum: string;
  uhrzeit: string;
  firmaName?: string;
  terminName?: string;
  contact?:string;
  todo?:string;
}

export interface BackendTermin {
  appointmentID: number;
  appointmentdate: string;
  appointmentname: string;
  jobofferID: number;
  joboffername: string;
  companyname: string;
  contact: string;
}

//************ MUI Komponente mit einigen anpassungen beginnt ****************

const TerminList: React.FC<TerminListProps> = ({open, handleClose}) => {

    const [errorMessage, setErrorMessage] = useState("");

    // Datum Input speichern (kopie aus AddAppointment)
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [time, setTime] = useState<Dayjs | null>(dayjs());
    //************* AppointmentName ****************
    const[appointmentName, setAppointmentName] = useState("");


  //********** onChange Handler für popup "Hinzufügen" ************
  const onDateChange = (newDate: Dayjs | null) => setDate(newDate);
  const onTimeChange = (newTime: Dayjs | null) => setTime(newTime);


  //***************** const für dropdown in Hinzufügen *************
  const [selectedJoboffer, setSelectedJoboffer] = useState<number | null>(null); //Ausgewähltes Jobangebot

  //hier wird das array erstellt für Popup um alle daten anzuzeigen
  const { listOfJoboffers, loading, error } = useOverviewOfAllJoboffers();

//*******************EDIT FUNCTION*********************************
    const handleEdit = (row: terminListProps) => {
        console.log("Bearbeite Termin:", row);}

//*******************Delete FUNCTION*********************************
    const handleDelete = (row: terminListProps) => {
        console.log("Delete Termin:", row);}

    const [rows, setRows] = useState<terminListProps[]>([])
    const columns: GridColDef<(typeof rows)[number]>[] = [
        {   field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'firmaName',
            headerName: 'Unternehmen',
            width: 200,
            editable: false,
            align: 'left',
            renderCell: params => (
                <span style={{cursor:'default'}}>{params.value}</span>
            ),
        },
        {
            field: 'terminName',
            headerName: 'Terminart',
            width: 185,
            editable: true,
            align: 'left',
        },
        {
            field: 'datum',
            headerName: 'Datum',
            width: 110,
            editable: false,
            sortable: true,

            renderCell: (params) => {
                const parsed = parseDatePassed(params.value as string);
                return <span>{parsed?.[1]}</span>;
            }

        },
        {
            field: 'uhrzeit',
            headerName: 'Uhrzeit',
            type: 'number',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            editable: false,
            sortable: false,

            renderCell: (params) => {
                const parsed = parseDatePassed(params.value as string);
                return <span>{parsed?.[2]}</span>;}
        },
        {
            field: 'contact',
            headerName: 'E-Mail',
            editable: true,
            align: 'left',
            flex:1,
            sortable:false,
        },
        {
            field: "function",
            headerName:"",
            width: 100,
            sortable:false,
            editable:false,
            filterable:false,
            disableColumnMenu:true,
            align:"center",
            renderCell:(params) =>(
                <Box sx={{display:"flex", gap:1}}>
                    <IconButton size="small"onClick={()=>handleEdit(params.row)}>
                        <Edit/>
                    </IconButton>
                    <IconButton size="small"onClick={()=>handleDelete(params.row)}>
                        <Delete/>
                    </IconButton>
                </Box>
            )
        }
    ];

  // use Effect wird immer aufgerufen beim ersten rendern.
  useEffect(() => {
    applicationTrackerApi.get("/appointments").then((response) => {
        console.log("Response from backend:", response.data);
      const today = new Date(); //erstellt ein neues Objekt mit dem heuigen Datum.

                const appointmentList = response.data

                    .map((t: BackendTermin): terminListProps => {
                        //const parsed = parseDatePassed(t.appointmentdate);

                        return{
                            id: t.appointmentID,
                            datum: t.appointmentdate,
                            uhrzeit: t.appointmentdate,
                            firmaName: t.companyname,
                            terminName: t.appointmentname,
                            //oDo: t.oDo,
                            contact: t.contact
                        };
                    })
                    //Filter erstellen, damit nur Termine Heute oder in Zukunft angezeigt werden
                    .filter((t: terminListProps) => {
                        return new Date(t.datum) >= today;
                    })

        console.log("Mapped Appointments:", appointmentList);
                setRows(appointmentList)
            });
    },[]);



    return (
        <Paper sx={{ width: '100%', display:"flex" ,flex:1, flexDirection:"column",overflow:"hidden", boxSizing: "border-box", border:1, borderColor:"primary.main",}}>

            <DataGrid

                sx={{
                    minHeight:0,
                    background: '',
                    border:"none",
                    flex:1,
                    padding :0,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "",
          },

          "& .MuiDataGrid-columnHeader": {
            //die einzelnen überschriften
            backgroundColor: "transparent",
            cursor:"default",
          },

          "& .MuiDataGrid-row": {
            marginBottom: "0px",
            "&:hover": {
                backgroundColor: undefined,

            },
          },
           '& .MuiDataGrid-row:last-child': {
               marginBottom: 0,
           },

           '& .MuiDataGrid-cell:focus': {
               outline: "none",
           },
           "& .MuiDataGrid-cell": {
                 cursor: "default",
           },

         }}

                hideFooter
                rows={rows}
                columns={columns}
                columnVisibilityModel={{ id: false }}
                disableRowSelectionOnClick

            />

      <Dialog
        open={open}
        onClose={handleClose} //wenn man neben das Fenster klickt, schließt sich das Fenster
        PaperProps={{ sx: { minWidth: 10, minHeight: 10 } }}
      >
        <DialogTitle>Neuer Termin</DialogTitle>
        <DialogContent>
          <FormControl fullWidth required sx={{ marginTop: 1 }}>
            <InputLabel id="companySelect">Firma - Bewerbung</InputLabel>
            <Select
              labelId="companySelect"
              value={selectedJoboffer}
              label="Firma - Bewerbung"
              onChange={(event) =>
                setSelectedJoboffer(event.target.value ? Number(event.target.value):null)
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    width: 200,
                  },
                },
              }}
            >
              {loading ? (
                <MenuItem disabled>Lade Daten...</MenuItem>
              ) : error ? (
                <MenuItem disabled>
                  Bitte erst eine Bewerbung erstellen
                </MenuItem>
              ) : (
                (listOfJoboffers ?? []) // fix: wir schauen ob listOfJoboffers NULL/undefined ist. wenn nicht nutzen wir es. wenn doch, geben wir leeres array.
                  .slice() //hier machen wir eine Kopie um original array nicht zu ändern... und sortieren anschließend mit .sort alphgabeetisch für die ausgabe
                  .sort((a, b) => a.companyName!.localeCompare(b.companyName!)) //sortiere dropdown alphabetisch nach company name
                  .map((offer) => (
                    <MenuItem key={offer.jobofferId} value={offer.jobofferId}>
                      {" "}
                      {/*Joboffer ID ist einzigartig also nutzzen wir ihn als key und value sagt: das ist die ID für selectedJoboffer... also welches Jobangebot wurde ausgewählt*/}
                      {offer.companyName} - {offer.jobofferName}{" "}
                      {/*das ist, was im Feld steht*/}
                    </MenuItem>
                  ))
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="appointmanetName"></InputLabel>
            <TextField
              label="appointmentName"
              value={appointmentName}
              onChange={(rabbit) => setAppointmentName(rabbit.target.value)}
              required
            />
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Lang}>
            <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>
              <DatePicker label="Datum" value={date} onChange={onDateChange} slotProps={{textField:{required:true,}}} />
              <TimePicker
                label="Uhrzeit"
                value={time}
                onChange={onTimeChange}
                slotProps={{textField:{required:true,}}}
              />
            </Box>
          </LocalizationProvider>

            {errorMessage && (
                <Box sx={{ color: "red", fontWeight: "bold", marginTop: 1 }}>
                    {errorMessage}
                </Box>
            )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}>
            <CustomButtonGroup
              buttons={[
                {
                  label: "Submit",
                  icon: <Send />,
                  iconPosition: "end",
                  onClick: () => {
                    sendButtonClicked(
                      date,
                      time,
                      appointmentName,
                      selectedJoboffer,
                      handleClose,
                      setErrorMessage
                    );
                  },
                },
              ]}
            />
          </Box>
        </DialogContent>
      </Dialog>
     </Paper>
  );
};
export default TerminList;
