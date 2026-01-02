import { Controller} from "react-hook-form";
import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import type { FormAutocompleteProps } from "./Props.ts";

export const FormInputAutocomplete = ({ name, idName, control, trigger, label, options, setValue, required, loading=false, sx}: FormAutocompleteProps) => {
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
                            setValue(idName, value.id, { shouldDirty: true });
                            renderProps.field.onChange(value.label);
                        }
                    }}

                    onInputChange={(_, value) => {
                        renderProps.field.onChange(value);
                        if(!value) {
                            setValue(idName, undefined, {shouldDirty: true});
                        }
                    }}
                    onBlur={() => {
                        const trimmed = renderProps.field.value?.trim()
                        if (!trimmed) {
                            setValue(idName, undefined, { shouldDirty: true });
                            renderProps.field.onChange("");
                            renderProps.field.onBlur();
                        } else {
                            const found = options.find(o => o.label === trimmed)
                            if(found) {
                                setValue(idName, found.id, { shouldDirty: true});
                            } else {
                                setValue(idName, undefined, { shouldDirty: true });
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