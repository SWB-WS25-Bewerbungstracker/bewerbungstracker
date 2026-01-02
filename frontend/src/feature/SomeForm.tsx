import {Stack, Typography, Button, Box} from "@mui/material"
import {useForm} from "react-hook-form";
import { useParams } from "react-router-dom";
import {FormInputText} from "./FormInputText.tsx";
import FormSection from "./FormSection.tsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema , type AddressFormValues, AddressForm } from "./AddressForm.tsx";
import applicationTrackerApi from "../services/api.ts";
import axios from "axios";

import {useEffect, useState} from "react";
import AddAppointments from "../components/AddAppointments.tsx";
import {type Appointment, removeIdForNewAppointments} from "../functions/parseDate";
import {FormInputAutocomplete} from "./FormInputAutocomplete.tsx";
import {useCompanyData} from "../functions/getAllCompaniesAndId.tsx";
import {useJobofferDetails} from "../functions/getJobofferById.tsx";
import {type AddJobofferFormProps} from "./Props.ts";


//Setting up  some basic validation with zod
const validationSchema = z.object({
    jobofferName: z.string("Pflichtfeld").min(1, "Pflichtfeld"),
    jobofferDescription: z.string().optional(),
    company: z.object({
        companyId: z.number().int().optional(),
        companyName: z.string("Pflichtfeld").min(1, "Pflichtfeld"),
        companyEmployees: z.number().int().min(0).optional(),
        companyLogo: z.string().optional(),
        companyAddress: AddressSchema.optional()

        }),
    contact: z.object({
        contactFirstName: z.string().optional(),
        contactLastName: z.string().optional(),
        contactPhoneNumber: z.string().optional(),
        contactEmail: z.string().optional(),
    }).optional(),
    distanceLength: z.string().optional(),
    distanceTime: z.string().optional(),
    salaryMinimum: z.number().optional(),
    salaryMaximum: z.number().optional(),
    perks: z.string().optional(),
    jobofferNotes: z.string().optional(),
})

//interface type for the useform and data (this structure will be sent to the backend but some values maybe undefined)
interface FormValues {
    jobofferName: string;
    jobofferDescription?: string;
    company: {
        companyId?: number;
        companyName: string;
        companyEmployees?: number;
        companyLogo?: string;
        companyAddress?: AddressFormValues;
    };
    contact?: {
        contactFirstName?: string;
        contactLastName?: string;
        contactPhoneNumber?: string;
        contactEmail?: string;
    };
    distanceLength?: string;
    distanceTime?: string;
    salaryMinimum?: number;
    salaryMaximum?:number;
    perks?: string;
    jobofferNotes?: string;
}

//Test form
const SomeForm:React.FC<AddJobofferFormProps> = ({id}) => {
    const { handleSubmit, control, trigger, setValue, watch, reset } = useForm<FormValues>({
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

    // Um welchen Vorgang handelt es sich? (Bearbeiten oder Hinzufügen (default)?)
    const isEdit = Boolean(id);

    /* ----------------------------------Bisherige Daten holen---------------------------------- */
    // Daten mithilfe externer Funktion laden
    const { jobofferDetails, loadingJoboffer, errorRetrievingJoboffer } =
        useJobofferDetails(id);

    useEffect(() => {
        if (!jobofferDetails) return;

        reset({
            jobofferName: jobofferDetails.jobofferName,
            jobofferDescription: jobofferDetails.jobofferDescription,
            jobofferNotes: jobofferDetails.jobofferNotes,

            company: {
                companyId: jobofferDetails.companyId,
                companyName: jobofferDetails.companyName,
                companyEmployees: jobofferDetails.companyEmployees,
                companyAddress: {
                    addressStreet: jobofferDetails.addressStreet,
                    addressZipCode: jobofferDetails.addressZipCode,
                    addressCity: jobofferDetails.addressCity,
                    addressCountry: jobofferDetails.addressCountry,
                },
            },

            salaryMinimum: jobofferDetails.jobofferMinimumWage,
            salaryMaximum: jobofferDetails.jobofferMaximumWage,
            perks: undefined,
        });

        setAppointments(jobofferDetails.appointments ?? [])
    }, [id, jobofferDetails, reset]);


    // Verwendung des Custom Hooks, um die Firmen- und Ladezustandsdaten zu holen
    const { listOfCompanies, loadingCompanies } = useCompanyData();

    const [appointments, setAppointments] =useState<Appointment[]>([]);

    //watch input of company to disable other company fields if company matches existing company.
    const companyName = watch("company.companyName").trim();
    const companyId   = watch("company.companyId");
    const companyMatched =
        !!companyId ||
        listOfCompanies.some(c => c.name === companyName);

    const onSubmit = async (data: FormValues) => {
        //remove empty contact object
        if (data.contact && Object.values(data.contact).every(v => v === undefined)) {
            delete data.contact;
        }
        //remove empty address object
        if (data.company.companyAddress && Object.values(data.company.companyAddress).every(v => v === undefined)) {
            delete data.company.companyAddress;
        }

        data = JSON.parse(JSON.stringify(data)); //remove undefined fields

        const payload = {
            ...data,
            jobofferId: id,
            appointments: appointments.length > 0 ? removeIdForNewAppointments(appointments) : [],
        }
        console.debug("onSubmit", payload); //log payload data
        //try Post
        try {
            if(isEdit){
                const response = await applicationTrackerApi.put(
                    "http://localhost:8080/joboffer/editForm", // Backend Schnittstelle
                    payload, // zu sendende Daten (automatisch als JSON)
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.debug(response.status)
                if (response.status === 201 || response.status === 200) {
                    //window.close();
                }
            } else {
                const response = await applicationTrackerApi.post("/joboffer/inputForm", payload,
                    {
                    headers: {
                        "Content-Type": "application/json",
                        },
                    }
                );
                console.debug(response.status)
                if (response.status === 201 || response.status === 200) {
                    //window.close();
                }
            }
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
                    <FormInputText name={"jobofferName"} control={control} trigger={trigger} label={"Titel der Stelle"} required/>
                    <FormInputText name={"jobofferDescription"} control={control} trigger={trigger} label={"Kurzbeschreibung der Stelle"} minRows={5}/>
                </FormSection>
                <FormSection title={"Firma"} direction={"row"}>
                    <FormInputAutocomplete name={"company.companyName"}
                                           idName={"company.companyId"}
                                           control={control}
                                           trigger={trigger}
                                           label={"Name der Firma"}
                                           options={listOfCompanies.map(
                                               (company) => (
                                                   {label: company.name, id: company.id}
                                               )
                                           )}
                                           setValue={setValue}
                                           required
                                           loading={loadingCompanies}
                                           sx={{flex: "0 0 70%"}}
                    />
                    <FormInputText name ={"company.companyEmployees"}
                                   control={control}
                                   trigger={trigger}
                                   label={"Anzahl Mitarbeiter"}
                                   type={"number"}
                                   disabled={companyMatched}
                    />
                </FormSection>
                <AddressForm control={control} trigger={trigger} baseName={"company.companyAddress"}/>
                <FormSection title={"Distanz"} direction={"row"}>
                    <FormInputText name={"distanceLength"} control={control} trigger={trigger} label={"Strecke"}/>
                    <FormInputText name ={"distanceTime"} control={control} trigger={trigger} label={"Fahrtzeit"}/>
                </FormSection>
                <FormSection title={"Kontakt"}>
                    <Stack
                        direction="row"
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        <FormInputText name={"contact.contactFirstName"} control={control} trigger={trigger} label={"Vorname"}/>
                        <FormInputText name ={"contact.contactLastName"} control={control} trigger={trigger} label={"Nachname"}/>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        <FormInputText name={"contact.contactPhoneNumber"} control={control} trigger={trigger} label={"Telefonnummer"}/>
                        <FormInputText name ={"contact.contactEmail"} control={control} trigger={trigger} label={"Email"}/>
                    </Stack>
                </FormSection>
                <AddAppointments
                    appointments={appointments}
                    onAppointmentChange={setAppointments}
                />
                <FormSection title={"Gehaltsspielraum"} direction={"row"}>
                    <FormInputText name ={"salaryMinimum"}
                                   control={control}
                                   trigger={trigger}
                                   label={"Minimum"}
                                   type={"number"}
                    />
                    <FormInputText name ={"salaryMaximum"}
                                   control={control}
                                   trigger={trigger}
                                   label={"Maximum"}
                                   type={"number"}
                    />
                </FormSection>
                <FormSection title={"Perks und Benefits"}>
                    <FormInputText name={"perks"} control={control} trigger={trigger} label={"Perks"} minRows={5}/>
                </FormSection>
                <FormSection title={"Persönliche Notizen"}>
                    <FormInputText name={"jobofferNotes"} control={control} trigger={trigger} label={"Notizen"} minRows={5}/>
                </FormSection>
                <Button type="submit" variant={"contained"} sx={{ mt: 2, display: "block" }}>
                    Submit
                </Button>
            </Box>
        </form>
    );
};
export default SomeForm;