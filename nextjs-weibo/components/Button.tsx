import React, { useState, useEffect, useRef } from 'react'
import { Button, ButtonProps } from 'react-bootstrap'


interface MyButtonProps extends ButtonProps {
    onClick: any;
    children: any;
}

function MyButton(props: MyButtonProps) {
    const [loading, setLoading] = useState(false)
    const isMountedRef = useRef(null);
    const handleClick = async (e: any) => {
        setLoading(true)
        await props.onClick(e)
        isMountedRef.current && setLoading(false)
    }
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, [])
    return (
        <>
            <Button
                {...props}
                disabled={loading}
                onClick={handleClick}>
                {props.children}
            </Button>
        </>
    )
}

export default MyButton