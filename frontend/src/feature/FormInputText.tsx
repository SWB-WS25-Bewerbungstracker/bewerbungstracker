import { Controller } from "react-hook-form";
import type { FormInputProps } from "./Props.ts";
import { TextField } from "@mui/material";

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement |  HTMLTextAreaElement>, field: any, type?: string): void  => {
    const val = event.target.value
    //check for field type
    if(type === "number"){
        //remove non number fields (no negatives possible with this setup
        if (/^-?\d*$/.test(val)) {
            const num = val === "" || val === "-" ? undefined : Number(val);
            field.onChange(num);
        }
    }
    else {
        field.onChange(val);
    }
}

const handleBlur = async (field: any, trigger: any, name: string, type?: string, ): Promise<void> => {
    if (type === "number") {
        const num = Number(field.value);
        field.onChange(Number.isNaN(num) ? undefined : num);    //if value is not a number empty the field
    } else {
        const trimmed = typeof field.value === "string"? field.value.trim(): undefined; //trimm unnecessary blanks
        field.onChange(trimmed === ""? undefined : trimmed);   //set empty string to undefined
    }
    //validation
    if (trigger && name) {
        await trigger(name);
    }
}


export const FormInputText = ({
                                  name,
                                  control,
                                  trigger,
                                  label,
                                  minRows = 1,
                                  required,
                                  type,
                                  disabled = false,
                                  sx
}: FormInputProps) => {

    return (
        <Controller
            name={name}
            control={control}
            render={(renderProps) => (
                <TextField
                    //size="small"
                    value={renderProps.field.value ?? ""}
                    onChange={(e) => handleInputChange(e, renderProps.field, type)}
                    onBlur={() => handleBlur(renderProps.field, trigger, name, type)}
                    error={!!renderProps.fieldState.error}
                    helperText={renderProps.fieldState.error?.message ?? " "}
                    fullWidth
                    label={label}
                    multiline={minRows > 1}
                    minRows={minRows}
                    required={required}
                    variant="outlined"
                    disabled={disabled}
                    sx={sx}
                />
            )}
        />
    );
};