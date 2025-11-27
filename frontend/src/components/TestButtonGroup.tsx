import Button from '@mui/material/Button';
import { Stack, type SvgIconProps } from '@mui/material';
import type { ReactElement } from 'react';

/*type Props = {
    buttons: { label: string; onClick: () => void }[];
}*/

export interface TestButtonGroupProps{
    buttons: {
        label: string; 
        icon: ReactElement;  
        iconPosition: string;
        onClick: (...args: unknown[])=>unknown}[];
}

export default function TestButtonGroup( { buttons }: TestButtonGroupProps) {
    return (
        <Stack direction={'row'} spacing={1}>
            {/* Flexible Anzahl an Buttons */}
            {buttons.map((b, i) => (
                <Button 
                variant="contained" 
                // Flexible Icons und Positionierung
                startIcon={b.iconPosition === 'start' ? b.icon : undefined}
                endIcon={b.iconPosition === 'end' ? b.icon : undefined}
                key={i} 
                // Flexible Funktionen
                onClick={b.onClick}>
                    {/* Flexible Bezeichnung*/}
                    {b.label}
                </Button>
                ))}
        </Stack>
    );
}
