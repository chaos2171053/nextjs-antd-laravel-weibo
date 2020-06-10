import React, { useState, useEffect } from 'react'
import { Pagination } from "react-bootstrap";
import { IProps } from '../layout/base-layout';
// TODO: Get params from url`s query



interface PaginationComponentIprops {
    total: number;
    onChange: Function;
}



// function PaginationComponent(props: PaginationComponentIprops) {
//     const { total = 0, onChange = () => { } } = props
//     const [current, setCurrent] = useState(1)

//     const onItemChange = (e) => {
//         const page = e.target.text
//         setCurrent(+page)
//         onChange(page)
//     }
//     useEffect(() => {
//         return () => {
//         }
//     }, [])
//     return (
//         <>
//             <Pagination className="mt-5 d-flex justify-content-center">
//                 {Array.from(String(total), Number).map((page, index) => (
//                     <Pagination.Item key={`Pagination-${index}`} active={index + 1 === current} onClick={onItemChange} >
//                         {index + 1}
//                     </Pagination.Item>
//                 ))}
//             </Pagination>
//         </>
//     )
// }





// const Hoc = (WrappedComponent) => {
//     return class extends React.Component<PaginationComponentIprops> {

//         constructor(props) {
//             super(props)
//         }
//         static getDerivedStateFromProps(next, now) {
//             return false
//         }
//         render() {
//             return (
//                 <WrappedComponent {...this.props}>
//                 </WrappedComponent>
//             )
//         }
//     }
// }




// export default Hoc(PaginationComponent)

interface IState {
    total: number;
    current: number;
}



// TODO:bug 翻页时父组件列表重新渲染导致子组件重新渲染，已利用shouldComponentUpdate阻止渲染，但是还是不行
class PaginationComponent extends React.Component<PaginationComponentIprops, IState> {
    constructor(props) {
        super(props)
        this.state = {
            total: props.total,
            current: 1,

        }
        this.onItemChange = this.onItemChange.bind(this);
    }
    onItemChange(e) {
        const current = +e.target.text
        if (Number.isNaN(current)) {
            return false
        }
        this.setState({
            current
        })
        this.props.onChange(current)
    }


    render() {
        const { total, current } = this.state
        return (
            <Pagination className="mt-5 d-flex justify-content-center">
                {Array.from(String(total), Number).map((page, index) => (
                    <Pagination.Item key={`Pagination-${index}`} active={index + 1 === current} onClick={this.onItemChange} >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        )
    }
}

function Hoc(WrappedComponent) {
    return class extends React.Component<any, any> {
        constructor(props) {
            super(props)
        }
        shouldComponentUpdate(nextProps: any, nowProps: any) {
            return false;
        }
        componentDidMount() {
            console.log('componentDidMount')
        }
        render() {
            return (
                <WrappedComponent {...this.props}>
                </WrappedComponent>
            )
        }
    }
}

export default Hoc(PaginationComponent)