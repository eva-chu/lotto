'use client';

import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface IProps {
  value: Dayjs | null,
  disabled?: boolean,
  onChange: (value: Dayjs | null) => void
}

export default function TimePicker({value, disabled, onChange}: IProps) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>      
      <MuiTimePicker        
        className="m-1" 
        views={['minutes', 'seconds']} 
        format="mm:ss"
        value={value}
        disabled={disabled}
        onChange={onChange} />
    </LocalizationProvider>
  );
}
