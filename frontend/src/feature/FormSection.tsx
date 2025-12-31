import React from "react";
import {Box, Paper, Stack, Typography} from "@mui/material";

const TitleWidth = "15%";

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
    direction?: "row" | "column"


}

const FormSection = ({title, children, direction}: FormSectionProps) =>
    (
        <Paper sx={{p: 2}}>
            <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ flexWrap: "wrap" }}
            >
            <Box minWidth={TitleWidth}>
                <Typography paddingBottom={1}>{title}</Typography>
            </Box>
                <Box flex={1}>
                    <Stack
                        direction={direction? direction: "column"}
                        spacing={1}
                        paddingLeft={1}
                        paddingBottom={1}
                    >
                        {children}
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    )

export default FormSection;