import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const rows = [
    { id: 1, FirmaName: 'Mercedes-Benz AG', Termin: 'Jjksdnf', Datum: 14 },
    { id: 2, FirmaName: 'Snow', Termin: 'Jon', Datum: 14, Uhrzeit: 14.20, ToDo:'duschen' },
    { id: 3, FirmaName: 'Snow', Termin: 'ton', Datum: 14, Uhrzeit: 14.20  },
    { id: 4, FirmaName: 'Snow', Termin: 'don', Datum: 14, Uhrzeit: 14.20  },
    { id: 5, FirmaName: 'Snow', Termin: 'son', Datum: 14, Uhrzeit: 14.20  },
    { id: 6, FirmaName: 'Snow', Termin: 'non', Datum: 14, Uhrzeit: 14.20  },
    { id: 7, FirmaName: 'Snow', Termin: 'von', Datum: 14, Uhrzeit: 14.20  },
];

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90},
    {
        field: 'FirmaName',
        headerName: 'Unternehmen',
        maxWidth: 150,
        editable: true,
        align: 'left',
    },
    {
        field: 'Termin',
        headerName: 'Terminart',
        width: 100,
        editable: true,
        align: 'left',
    },
    {
        field: 'Datum',
        headerName: 'Datum',
        type: 'number',
        width: 110,
        editable: true,
        align: 'center',
        headerAlign: 'left',
    },
    {
        field: 'Uhrzeit',
        headerName: 'Uhrzeit',
        type: 'number',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        editable: true,
    },
    {
        field: 'ToDo',
        headerName: 'To-Do',
        width: 160,
        align: 'left',
        headerAlign: 'left',
        editable: true,
    },
];

const TerminList: React.FC = () => {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                sx={{
                    background: '',
                    '& .MuiDataGrid-row': {
                        marginBottom: '8px',
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
