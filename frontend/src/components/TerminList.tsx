import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { parseDatePassed } from "../functions/parseDateFromIso";
//import axios from "axios"; // für HHTP Requests( PUT, GET, etc.)
import applicationTrackerApi from "../services/api.ts";
import { useEffect, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Save, Delete, Send } from "@mui/icons-material";
import { getLang } from "../functions/getLanguage";
import "dayjs/locale/de";
import "dayjs/locale/en";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
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
import CustomButtonGroup from "./ButtonGroup";

const Lang = getLang();

//*************** Toolbar function ****************

function CustomToolbar({ onAddClick }: { onAddClick: () => void }) {
  return (
    <Box
      sx={{
        justifyContent: "flex",
        display: "flex",
        alignItems: "center",
        padding: 1,
      }}
    >
      <Button variant="contained" onClick={onAddClick}>
        + Hinzufügen
      </Button>
    </Box>
  );
}

//***************** Send Button function ***********************************

async function sendButtonClicked(
    date,
    time,
    appointmentName,
    selectedJoboffer,
    closeDialog,
    setErrorMessage: (msg: string) => void

) {
  if (!date || !time || !appointmentName || selectedJoboffer === "") {
      setErrorMessage("Alles ausfüllen bitte!"); // Fehler setzen
    return;
  }

    setErrorMessage("");

  const carrotForRabbit = date
    .hour(time.hour())
    .minute(time.minute())
    .second(0)
    .toISOString();

  console.debug("Ich sende ans Backend:", {
    appointmentdate: carrotForRabbit,
    appointmentname: appointmentName,
    jobofferID: selectedJoboffer,
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
            console.debug(err)
            alert("Der Hase hat die Karotte nicht geliefert :(")
        }

  */
}


//**************** INTERFACE *************************
export interface terminListProps {
  id: number;
  //datumSort: string; //datum als ISO string um soriteren zu können.
  datum: string;
  uhrzeit: string;
  firmaName?: string;
  terminName?: string;
  toDo?: string;
  contact?: string;
}

export interface BackendTermin {
  appointmentID: number;
  appointmentdate: string;
  appointmentname: string;
  jobofferID: number;
  joboffername: string;
  companyname: string;
}

//************ MUI Komponente mit einigen anpassungen beginnt ****************

const TerminList: React.FC = () => {

    const [errorMessage, setErrorMessage] = useState("");

    // Datum Input speichern (kopie aus AddAppointment)
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [time, setTime] = useState<Dayjs | null>(dayjs());
    //************* AppointmentName ****************
    const[appointmentName, setAppointmentName] = useState("");


  //********** onChange Handler für popup "Hinzufügen" ************
  const onDateChange = (newDate: Dayjs | null) => setDate(newDate);
  const onTimeChange = (newTime: Dayjs | null) => setTime(newTime);

  //************ const für Popup "Hinzufügen" *******************
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //***************** const für dropdown in Hinzufügen *************
  const [selectedJoboffer, setSelectedJoboffer] = useState<number | "">(""); //Ausgewähltes Jobangebot

  //hier wird das array erstellt für Popup um alle daten anzuzeigen
  const { listOfJoboffers, loading, error } = useOverviewOfAllJoboffers();




    const [rows, setRows] = useState<terminListProps[]>([])
    const columns: GridColDef<(typeof rows)[number]>[] = [
        {   field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'firmaName',
            headerName: 'Unternehmen',
            width: 120,
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
    applicationTrackerApi.get("/appointments").then((response) => {
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
                            //contact: t.contact
                        };
                    })

                    //Filter erstellen, damit nur Termine Heute oder in Zukunft angezeigt werden
                    .filter((t: terminListProps) => {
                        return new Date(t.datum) >= today;
                    })


                setRows(appointmentList)
            });
    },[]);



    return (
        <Box sx={{ height: 375, width: '100%' }}>
            <DataGrid

                sx={{
                    background: 'transparent',

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "transparent",
          },

          "& .MuiDataGrid-columnHeader": {
            //die einzelnen überschriften
            backgroundColor: "transparent",
            color: "black",
          },

          "& .MuiDataGrid-row": {
            marginBottom: "0px",
            "&:hover": {
              backgroundColor: "lightblue", // Beispiel-Hover-Farbe
            },
          },

                    '& .MuiDataGrid-row:last-child': {
                        marginBottom: 0,
                    },

                }}

                rows={rows}
                columns={columns}
                columnVisibilityModel={{ id: false }}
                initialState={{
                    pagination: { paginationModel: { pageSize: 4 } },
                    sorting: {                  //wir initialisieren die Tabelle am anfang Sortiert nach Terminen
                        sortModel: [
                            {field: 'datum', sort: 'asc'}
                        ]
                    }
                }}
                pageSizeOptions={[4]}
                disableRowSelectionOnClick
                slots={{ toolbar:()=> <CustomToolbar onAddClick={handleOpen}/> }}
                showToolbar
            />

      <Dialog
        open={open}
        onClose={handleClose} //wenn man neben das Fenster klickt, schließt sich das Fenster
        PaperProps={{ sx: { minWidth: 10, minHeight: 10 } }}
      >
        <DialogTitle>Neuer Termin</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="companySelect">Firma - Bewerbung</InputLabel>
            <Select
              labelId="companySelect"
              value={selectedJoboffer}
              label="Firma - Bewerbung"
              onChange={(event) =>
                setSelectedJoboffer(event.target.value as number)
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
                  Der code ist perfekt. DU hast mist gebaut...
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
            />
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Lang}>
            <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>
              <DatePicker label="Datum" value={date} onChange={onDateChange} />
              <TimePicker
                label="Uhrzeit"
                value={time}
                onChange={onTimeChange}
              />
            </Box>
          </LocalizationProvider>

            {errorMessage && (
                <Box sx={{ color: "red", fontWeight: "bold", marginTop: 1 }}>
                    {errorMessage}
                </Box>
            )}

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
            <CustomButtonGroup
              buttons={[
                {
                  label: "Senden",
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
    </Box>
  );
};
export default TerminList;
