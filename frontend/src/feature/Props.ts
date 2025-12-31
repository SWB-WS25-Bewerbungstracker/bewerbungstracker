import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

export interface FormInputProps {
    name: string;       //name of the field (has to match inputDTO- and FormValues fields)
    control: any;       //controller from react-hook-form
    trigger: any;       //trigger for onBlur validation
    label: string;
    setValue?: any;     //not in use (copied from tutorial)
    minRows?: number;   //multiline field with min rows =number
    type?:string;       //type of field (number, text ...) default = "text"

    sx?: SxProps<Theme>;
}

export interface FormSectionProps {
    title: string;
    children: ReactNode;
    direction?: "row" | "column"
}
