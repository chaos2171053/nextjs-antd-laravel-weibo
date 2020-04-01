import React from 'react';
import TextField from '../components/TextField';

// interface RFTextFieldProps {
//     autoComplete?: string;
//     input: object;
//     InputProps?: object;
//     label?: string;
//     meta: { error?: string; touched: boolean; submitError?: string; };
// }

function RFTextField(props: any) {
    const {
        autoComplete,
        input,
        InputProps,
        meta: { touched, error, submitError },
        ...other
    } = props;

    return (
        <TextField
            error={Boolean(touched && (error || submitError))}
            {...input}
            {...other}
            InputProps={{
                inputProps: {
                    autoComplete,
                },
                ...InputProps,
            }}
            helperText={touched ? error || submitError : ''}
        />
    );
}

export default RFTextField;
