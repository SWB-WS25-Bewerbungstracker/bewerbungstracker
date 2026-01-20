import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { parseDatePassed } from "../functions/parseDateFromIso";
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
import {submitButtonClicked} from "../functions/sendAppointments.ts";
import {deleteAppointment}  from "../functions/deleteAppointment.ts";
const Lang = getLang();

interface TerminListDialogProps {
    open: boolean;
    handleClose: () => void;
    height?: string|number;
}
export interface AppointmentRow {
  id: number;
  datum: string;
  uhrzeit: string;
  firmaName?: string;
  terminName?: string;
  contact?:string;
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
const TerminList: React.FC<TerminListDialogProps> = ({open, handleClose, height}) => {

  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  const[appointmentName, setAppointmentName] = useState("");
  const onDateChange = (newDate: Dayjs | null) => setDate(newDate);
  const onTimeChange = (newTime: Dayjs | null) => setTime(newTime);
  const [selectedJoboffer, setSelectedJoboffer] = useState<number | null>(null); //Ausgewähltes Jobangebot
  const { listOfJoboffers, loading, error } = useOverviewOfAllJoboffers();
  const handleEdit = (row: AppointmentRow) => {
        console.log("Bearbeite Termin:", row);}

    //zusätzliches await catch, damit fehler nicht übergangen werden aus dem backend
    const handleDelete = async (row: AppointmentRow) => {
        console.log("Delete Termin:", row.id)
        try{
            await deleteAppointment(row.id);
            window.location.reload(); //vorübergangslösung. falls Zeit: useEffect als Funktion damit nur daten neu laden nicht ganze seite
        }catch (error){
            console.error("konnte nicht gelöscht werden")
            throw error;
        }
    }

    const [rows, setRows] = useState<AppointmentRow[]>([])
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
            editable: false,
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
            editable: false,
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
                <Box sx={{display:"flex", gap:1,alignContent:"center",height:"100%",
                }}>
                    <IconButton size="small" onClick={()=>handleEdit(params.row)}
                                sx={{"&:hover": {backgroundColor: "transparent",},}}>
                        <Edit/>
                    </IconButton>
                    <IconButton size="small" onClick={()=>handleDelete(params.row)}
                                sx={{"&:hover": {backgroundColor: "transparent",},}}>
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
      const today = new Date();

                const appointmentList = response.data

                    .map((t: BackendTermin): AppointmentRow => {

                        return{
                            id: t.appointmentID,
                            datum: t.appointmentdate,
                            uhrzeit: t.appointmentdate,
                            firmaName: t.companyname,
                            terminName: t.appointmentname,
                            contact: t.contact
                        };
                    })
                    //Filter erstellen, damit nur Termine Heute oder in Zukunft angezeigt werden
                    .filter((t: AppointmentRow) => {
                        return new Date(t.datum) >= today;
                    })

        console.log("Mapped Appointments:", appointmentList);
                setRows(appointmentList)
            });
    },[]);

    return (
        <Paper sx={{ width: '100%', display:"flex" ,flex:1, flexDirection:"column",overflow:"hidden", boxSizing: "border-box", border:1, borderColor:"primary.main",height: height||"auto",}}>

            <DataGrid
                sx={{
                    minHeight:0,
                    background: '',
                    border:"none",
                    flex:1,
                    padding :0,
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "transparent",
            cursor:"default",
          },
          '& .MuiDataGrid-columnHeader:focus': {
                 outline: "none",
          },
          '& .MuiDataGrid-columnHeader:focus-within': {
                outline: "none",
          },
           "& .MuiDataGrid-cell": {
                 cursor: "default",
           },
           '& .MuiDataGrid-cell:focus': {
                 outline: "none",
           },
           '& .MuiDataGrid-cell:focus-within': {
                  outline: "none",
           },
           "& .MuiIconButton-root:focus-visible": {
                 outline: "none",
           },
           "& .MuiIconButton-root:focus": {
                 outline: "none",
           },

         }}

                hideFooter
                rows={rows}
                columns={columns}
                columnVisibilityModel={{ id: false }}
                disableRowSelectionOnClick
                initialState={{sorting:{sortModel:[{field:"datum", sort:"asc",},],},}}
            />

      <Dialog
        open={open}
        onClose={handleClose}
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
                  .sort((a, b) => a.companyName!.localeCompare(b.companyName!)) //sortiere dropdown alphabetisch nach company name
                  .map((offer) => (
                    <MenuItem key={offer.jobofferId} value={offer.jobofferId}>
                      {" "}
                      {/*Joboffer ID ist einzigartig also nutzzen wir ihn als key und value sagt: das ist die ID für selectedJoboffer... also welches Jobangebot wurde ausgewählt*/}
                      {offer.companyName} - {offer.jobofferName}{" "}
                    </MenuItem>
                  ))
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="appointmanetName"></InputLabel>
            <TextField
              label="Terminname"
              value={appointmentName}
              onChange={(rabbit) => setAppointmentName(rabbit.target.value)}
              required
            />
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={Lang}>
            <Box sx={{ display: "flex", marginTop: 2, gap: 3, justifyContent:"space-between",  }}>

                <DatePicker
                    label="Datum"
                    value={date}
                    onChange={onDateChange}
                    slotProps={{textField:{required:true,}}}
                />
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

          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <CustomButtonGroup
              buttons={[
                {
                  label: "Submit",
                  icon: <Send />,
                  iconPosition: "end",
                  onClick: () => {
                    submitButtonClicked(
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
