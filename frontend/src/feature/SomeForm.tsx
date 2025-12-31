import {Stack, Typography, Button, Box} from "@mui/material"
import {useForm} from "react-hook-form";
import {FormInputTest} from "./FormInputTest.tsx";
import FormSection from "./FormSection.tsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema , type AddressFormValues, AddressForm } from "./AdressForm.tsx";
import applicationTrackerApi from "../services/api.ts";
import axios from "axios";

//Setting up  some basic validation with zod
const validationSchema = z.object({
    jobofferName: z.string("Pflichtfeld"),
    jobofferDescription: z.string().optional(),
    company: z.object({
        companyName: z.string("Pflichtfeld"),
        companyEmployees: z.number().int().min(0).optional(),
        companyLogos: z.string().optional(),
        address: AddressSchema

        }),
    contact: z.object({
        contactFirstName: z.string().optional(),
        contactLastName: z.string().optional(),
        contactPhoneNumber: z.string().optional(),
        contactEmail: z.string().optional(),
    }).optional(),
    distanceLength: z.string().optional(),
    distanceTime: z.string().optional(),
})

//interface type for the useform and data (this structure will be sent to the backend but some values maybe undefined)
interface FormValues {
    jobofferName: string;
    jobofferDescription?: string;
    company: {
        companyName: string;
        companyEmployees?: number;
        companyLogo?: string;
        address?: AddressFormValues;
    };
    contact?: {
        contactFirstName?: string;
        contactLastName?: string;
        contactPhoneNumber?: string;
        contactEmail?: string;
    };
    distanceLength?: string;
    distanceTime?: string;
}

//Test form
const SomeForm = () => {
    const { handleSubmit, control, trigger } = useForm<FormValues>({
        resolver: zodResolver(validationSchema),
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            jobofferName: "",
            company: {
                companyName: "",
            },
        },
    });

    const onSubmit = async (data: FormValues) => {
        //remove empty contact object
        if (data.contact && Object.values(data.contact).every(v => v === undefined)) {
            delete data.contact;
        }
        //remove empty address object
        if (data.company.address && Object.values(data.company.address).every(v => v === undefined)) {
            delete data.company.address;
        }

        const payload = JSON.parse(JSON.stringify(data)); //remove undefined fields
        console.debug("onSubmit", payload); //log payload data
        //try Post
        try {
            const response = await applicationTrackerApi.post("/joboffer/inputForm", data,
                {
                headers: {
                    "Content-Type": "application/json",
                    },
                }
            );
            console.debug(response.status)
        } catch(error) {
            // Axios-Fehlerbehandlung
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    padding: 2,
                }}
            >
                <Typography variant="h4">Some Form</Typography>

                <FormSection title={"Stelle"}>
                    <FormInputTest name={"jobofferName"} control={control} trigger={trigger} label={"Stellenbezeichnung"}/>
                    <FormInputTest name={"jobofferDescription"} control={control} trigger={trigger} label={"Kurzbeschreibung der Stelle"} minRows={5}/>
                </FormSection>

                <FormSection title={"Firma"} direction={"row"}>
                    <FormInputTest name={"company.companyName"} control={control} trigger={trigger} label={"Firmenname"} sx={{flex: "0 0 70%"}}/>
                    <FormInputTest name ={"company.companyEmployees"} control={control} trigger={trigger} label={"Anzahl Mitarbeiter"} type={"number"} />
                </FormSection>

                <AddressForm control={control} trigger={trigger} baseName={"company.address"}/>

                <FormSection title={"Distanz"}>
                    <FormInputTest name={"distanceLength"} control={control} trigger={trigger} label={"Strecke"}/>
                    <FormInputTest name ={"distanceTime"} control={control} trigger={trigger} label={"Fahrtzeit"}/>
                </FormSection>

                <FormSection title={"Kontakt"}>
                    <Stack
                        direction="row"
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        <FormInputTest name={"contact.contactFirstName"} control={control} trigger={trigger} label={"Vorname"}/>
                        <FormInputTest name ={"contact.contactLastName"} control={control} trigger={trigger} label={"Nachname"}/>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        <FormInputTest name={"contact.contactPhoneNumber"} control={control} trigger={trigger} label={"Telefonnummer"}/>
                        <FormInputTest name ={"contact.contactEmail"} control={control} trigger={trigger} label={"Email"}/>
                    </Stack>
                </FormSection>
                
                <Button type="submit" variant={"contained"} sx={{ mt: 2, display: "block" }}>
                    Submit
                </Button>
            </Box>
        </form>
    );
};
export default SomeForm;