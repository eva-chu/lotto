import Button from '@/components/atoms/Button';
import React from 'react';
import { grey, red } from '@mui/material/colors';

export enum BUTTON_TYPE {
    DEFAULT='default',
    CANCEL='cancel',
    DANGER='danger'
}

const styleMap: Record<string, React.CSSProperties> = {
    cancel: {
        backgroundColor: grey[200],
        color: grey[700],
        border: 0,
        boxShadow: 'none',
    },
    danger: {
        backgroundColor: red[200],
        color: red[700],
        border: 0,
        boxShadow: 'none',
    }
}

interface IProps {
    type?: BUTTON_TYPE; 
    onClick?: () =>  void;
    disabled?: boolean; 
    children?: JSX.Element | string;
    className?: string;
}

export default function ButtonBase ({ type=BUTTON_TYPE.DEFAULT, onClick, children, className, disabled=false }: IProps) {
    return (
        <Button 
            className={className} 
            style={{
                ...styleMap[type]
            }} 
            onClick={onClick}
            disabled={disabled}>
            {children}
        </Button>
    );
};