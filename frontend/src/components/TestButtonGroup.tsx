import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

/*type Props = {
    buttons: { label: string; onClick: () => void }[];
}*/

export interface TestButtonGroupProps{
    buttons: {label: string; onClick: (...args: unknown[])=>unknown}[];
}

export default function TestButtonGroup( { buttons }: TestButtonGroupProps) {
    return (
        <ButtonGroup variant="contained">
            {buttons.map((b, i) => (
                <Button key={i} onClick={b.onClick}>
                    {b.label}
                </Button>
                ))}
        </ButtonGroup>
    );
}
