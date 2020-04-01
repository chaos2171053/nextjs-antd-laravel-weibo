import React from 'react';
import defer from './defer';
import Button from '../components/Button';

interface IProps {
    disabled?: boolean;
    mounted?: boolean;
}

function FormButton(props: IProps) {
    const { disabled, mounted, ...others } = props;
    return <Button disabled={!mounted || disabled} type="submit" variant="contained" {...others} />;
}


export default defer(FormButton);
