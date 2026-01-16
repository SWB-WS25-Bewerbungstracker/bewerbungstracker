import { Controller} from "react-hook-form";
import {Autocomplete, CircularProgress, type SxProps, TextField, type Theme} from "@mui/material"

interface AutocompleteInputProps {
    name: string;       //name of the field (has to match inputDTO- and FormValues fields)
    control: any;       //controller from react-hook-form
    trigger: any;       //trigger for onBlur validation
    label: string;
    options: Array< {label: string , id: string }>;
    setValue: any;
    required?: boolean;
    disabled?: boolean;
    loading?: boolean;
    sx?: SxProps<Theme>;
}


export const AutocompleteInput = ({ name, control, trigger, label, options, setValue, required, loading=false, sx}: AutocompleteInputProps) => {
    return(
        <Controller
            name={name}
            control={control}
            render={(renderProps) => (
                <Autocomplete
                    freeSolo
                    options={options}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.label}
                        </li>
                    )}
                    getOptionLabel={(option) => (typeof option === "string" ? option : option.label)}
                    isOptionEqualToValue={(option, value) =>
                        typeof value === "string" ? option.label === value : option.id === value.id
                    }
                    loading={loading}
                    disabled={loading}
                    value={renderProps.field.value ?? ""}

                    onChange={(_, value) => {
                        if (typeof value === "object" && value) {
                            setValue(value.id, { shouldDirty: true });
                            renderProps.field.onChange(value.label);
                        }
                    }}

                    onInputChange={(_, value) => {
                        renderProps.field.onChange(value);
                        if(!value) {
                            setValue(undefined, {shouldDirty: true});
                        }
                    }}
                    onBlur={() => {
                        const trimmed = renderProps.field.value?.trim()
                        if (!trimmed) {
                            setValue(undefined, { shouldDirty: true });
                            renderProps.field.onChange("");
                            renderProps.field.onBlur();
                        } else {
                            const found = options.find(o => o.label === trimmed)
                            if(found) {
                                setValue(found.id, { shouldDirty: true});
                            } else {
                                setValue(undefined, { shouldDirty: true });
                            }
                            renderProps.field.onChange(trimmed === "" ? undefined : trimmed);
                            renderProps.field.onBlur();
                            trigger?.(name);
                        }
                    }}
                    fullWidth
                    renderInput={(params)=> (
                        <TextField
                            {...params}
                            label={label}
                            required={required}
                            error={!!renderProps.fieldState.error}
                            helperText={renderProps.fieldState.error?.message ?? " "}
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: "search",
                                    endAdornment: (
                                        <>
                                            {loading ? <CircularProgress size={18} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                },
                            }}
                        />
                    )}
                    sx={sx}
                />
            )}
        />
    )
}