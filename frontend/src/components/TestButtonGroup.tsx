import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Stack, type SvgIconClassKey, type SvgIconOwnProps, type SvgIconProps } from '@mui/material';
import type { ReactElement } from 'react';
import type { SvgIconComponent } from '@mui/icons-material';

/*type Props = {
    buttons: { label: string; onClick: () => void }[];
}*/

export interface TestButtonGroupProps{
    buttons: {
        label: string; 
        icon: SvgIconClassKey;  
        onClick: (...args: unknown[])=>unknown}[];
}

export default function TestButtonGroup( { buttons }: TestButtonGroupProps) {
    return (
        <Stack direction={'row'} spacing={1}>
            {buttons.map((b, i) => (
                <Button 
                variant="contained" 
                startIcon={b.icon} 
                key={i} 
                onClick={b.onClick}>
                    {b.label}
                </Button>
                ))}
        </Stack>
    );
}
