import React from 'react'
import { getValue } from '../utils/localstorage';
import { useRouter } from 'next/router'
function AuthHoc(Compnent) {
    const router = useRouter()
    if (!getValue('Token')) {
        router.push('/sign-in')
        return;
    }
    return (
        <>
            <Compnent />
        </>
    )

}

export default AuthHoc

