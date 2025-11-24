import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

type Props = {
    buttons: { label: string; onClick: () => void }[];
}

export default function TestButtonGroup( { buttons }: Props) {
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
