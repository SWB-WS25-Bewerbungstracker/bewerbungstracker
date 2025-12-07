import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { parseDatePassed } from "../functions/parseDateFromIso";
import axios from "axios"; // für HHTP Requests( PUT, GET, etc.)
import { useEffect, useState } from "react";
import { Box, Button} from '@mui/material';

//*************** Toolbar function ****************

function CustomToolbar(){
    return(
        <Box sx ={{
                justifyContent: "flex",
                display:"flex",
                alignItems: "center",
                padding: 1
        }}>
            <Button variant="contained">Termin hinzufügen</Button>
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

    const [rows, setRows] = useState<terminListProps[]>([])
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90},
        {
            field: 'firmaName',
            headerName: 'Unternehmen',
            maxWidth: 150,
            editable: false,
            align: 'left',
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
                slots={{ toolbar: CustomToolbar }}
                showToolbar
            />
        </Box>
    );
}
export default TerminList;
