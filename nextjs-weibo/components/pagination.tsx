import React, { useState } from 'react'
import { Pagination } from "react-bootstrap";
// TODO: Get params from url`s query



interface PaginationComponentIprops {
    defaultCurrent?: number;
    total?: number;
    onChange?: Function;
}



function PaginationComponent(props: PaginationComponentIprops) {
    const { defaultCurrent = 1, total = 0, onChange = () => { } } = props
    const [current, setCurrent] = useState(defaultCurrent)

    const onItemChange = (e) => {
        const page = e.target.text
        setCurrent(page)
        onChange(page)
    }


    return (
        <>
            <Pagination className="mt-5 d-flex justify-content-center">
                {Array.from(String(total), Number).map((page, index) => (
                    <Pagination.Item key={`Pagination-${index}`} active={index === current - 1} onClick={onItemChange} activeLabel={'actual'}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}



export default PaginationComponent