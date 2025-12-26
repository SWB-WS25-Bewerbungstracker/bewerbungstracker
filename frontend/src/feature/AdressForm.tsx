import {Paper,Stack, Typography, Box} from "@mui/material"
import * as z from "zod";
import { FormInputTest } from "./FormInputTest.tsx";

const TitleWidth = "15%";

//validation
export const AddressSchema = z.object({
    addressStreet: z.string().optional(),
    addressStreetNumber: z.string().regex(/^\d+[a-zA-Z]?(?:[-/]\d+)?$/, "Ungültige Hausnummer").optional(),
    addressZipCode: z.string().optional(),
    addressCity: z.string().optional(),
    addressCountry: z.string().optional(),
}).optional()

//Address data interface
export interface AddressFormValues {
    addressStreet?: string;
    addressStreetNumber?: string;
    addressZipCode?: string;
    addressCity?: string;
    addressCountry?: string;
}

//exported AddressForm
//has to be embedded in another form with a control which is passed in control
export const AddressForm = ({ control, trigger, baseName }: { control: any; trigger: any; baseName: string}) => {
    return (
        <Paper sx={{p:0, mt:2}}>
            <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ flexWrap: "wrap" }}
            >
                <Box minWidth={TitleWidth}>
                    <Typography paddingBottom={1}>Adresse</Typography>
                </Box>
                <Box flex={1}>
                    <Stack
                        direction="row"
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        <FormInputTest name={`${baseName}.addressStreet`} control={control} trigger={trigger} label={"Straße"}/>
                        <FormInputTest name={`${baseName}.addressStreetNumber`} control={control} trigger={trigger} label={"Hausnummer"}/>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        <FormInputTest name={`${baseName}.addressZipCode`} control={control} trigger={trigger} label={"PLZ"} sx={{flex: "0 0 100px"}}/>
                        <FormInputTest name={`${baseName}.addressCity`} control={control} trigger={trigger} label={"Ort"}/>
                        <FormInputTest name={`${baseName}.addressCountry`} control={control} trigger={trigger} label={"Land"}/>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    )
}
