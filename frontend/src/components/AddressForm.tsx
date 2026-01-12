import {Stack,} from "@mui/material"
import * as z from "zod";
import { TextInput } from "./TextInput.tsx";
import FormSection from "./FormSection.tsx";


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
        <FormSection title={"Adresse"}>
            <Stack
                direction="row"
                spacing={1}
                paddingLeft={1}
                paddingBottom={1}
            >
                <TextInput name={`${baseName}.addressStreet`} control={control} trigger={trigger} label={"Straße"}/>
                <TextInput name={`${baseName}.addressStreetNumber`} control={control} trigger={trigger} label={"Hausnummer"}/>
            </Stack>
            <Stack
                direction="row"
                spacing={1}
                paddingLeft={1}
                paddingBottom={1}
            >
                <TextInput name={`${baseName}.addressZipCode`} control={control} trigger={trigger} label={"PLZ"} sx={{flex: "0 0 20%"}}/>
                <TextInput name={`${baseName}.addressCity`} control={control} trigger={trigger} label={"Ort"}/>
                <TextInput name={`${baseName}.addressCountry`} control={control} trigger={trigger} label={"Land"}/>
            </Stack>
        </FormSection>

    )
}
