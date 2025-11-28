import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { parseDatePassed } from "../functions/parseDateFromIso";
import axios from "axios"; // für HHTP Requests( PUT, GET, etc.)
import { useEffect, useState } from "react";

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
            editable: true,
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
            width: 160,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        ];

// use Effect wird immer aufgerufen beim ersten rendern.
    useEffect(() => {
        axios
            .get('http://localhost:8080/appointments')
            .then((response) =>
        {
            const appointmentDataMapped = response.data.map(
                (t: BackendTermin): terminListProps => {
                    const parsed = parseDatePassed(t.appointmentdate);
                    return{
                        id: t.appointmentID,
                        datum: parsed[1],
                        uhrzeit: parsed[2],
                        firmaName: t.companyname,
                        terminName: t.appointmentname,
                        //toDo: t.toDo,
                        //contact: t.contact
                    };
                }
            );
            setRows(appointmentDataMapped)
        });
    },[]);



    return (
        <Box sx={{ height: 370, width: '100%' }}>
            <DataGrid
                sx={{
                    background: '',
                    '& .MuiDataGrid-row': {
                        marginBottom: '0px',
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
            />
        </Box>
    );
}
export default TerminList;
