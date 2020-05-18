import React from 'react';
import { TextField } from '@material-ui/core';

const CustomTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

export default CustomTextField;