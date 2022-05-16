import { FC } from "react";
import { Button } from '@mui/material';

interface ButtonComponentProps {
    iconButton?: any;
    handleOnClick: any;
    variantType?: any;
    textButton: string;
    colorButton?: any;
    disabledButton?: boolean;
}
export const ButtonComponent: FC<ButtonComponentProps> = ({ iconButton, handleOnClick, variantType, textButton, colorButton, disabledButton }) => (
    <>
        <Button
            color={colorButton || 'primary'}
            startIcon={iconButton || ''}
            onClick={handleOnClick}
            variant={variantType || "outlined"}
            disabled={disabledButton || false}
        >
            {textButton}
        </Button>
    </>
);