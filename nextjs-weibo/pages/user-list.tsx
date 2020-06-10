import React, { useState, useEffect, memo, useCallback } from "react";

import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import BaseLayout from "../layout/base-layout";
import { ListGroup, Pagination } from "react-bootstrap";
import PaginationComponent from '../components/pagination'
import { apiGetUserList } from "../apis/user";
import { UserState } from "../store/modules/user";


interface IProps {
    // total: number;
    // users: {
    //     data: Array<UserState>
    // }
}
interface IState {
    usersListTotal: number;
    usersList: Array<UserState>;
    current: number;
}



/*
const UserList = (props: IProps) => {
    // const { users, total } = props;
    const [usersList, setUsersList] = useState([])
    const [usersListTotal, setUsersListTotal] = useState(0)
    const [initPage, setInitPage] = useState(false)

    useEffect(() => {
        onListChange(1)
        return () => {

        }
    }, [])

    useEffect(() => {
        console.log('234242')
    }, [usersList])


    console.log('list render')

    const onListChange = useCallback((page) => {
        apiGetUserList({ page: page }).then((res: any) => {
            if (!initPage) {
                setInitPage(true)
                setUsersListTotal(res.total)
            }
            setUsersList(res.data)
        })
    }, [])
    return (
        <>
            <Page title="User list-find some fun">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <ListGroup>
                        {usersList.map(user => (
                            <ListGroup.Item key={user.id}>{user.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    <PaginationComponent
                        total={usersListTotal}
                        onChange={onListChange}
                    />
                </BaseLayout>
            </Page>
        </>
    );
};
*/


// UserList.getInitialProps = async ({ ctx }) => {
//     // TODO:未知Bug 后台用户列表服务端请求重复两次且数据格式不一致，先不用服务端请求
//     // const data = await (await apiGetUserList({ page: 1, size: 10, ctx })) as any
//     return {
//         // total: data.total,
//         // users: data.data
//     }
// };

class UserList extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            usersListTotal: 0,
            usersList: [],
            current: 1
        };
        this.onListChange = this.onListChange.bind(this);
    }
    static async getInitialProps(ctx) {
        return {}
    }
    onListChange(page) {
        typeof page === 'number' ? page : page = +page.target.text
        this.setState({
            current: page
        })
        apiGetUserList({ page }).then((res: any) => {

            this.setState({
                usersListTotal: res.total,
                usersList: res.data,
            })
        })
    }
    componentDidMount() {
        this.onListChange(1)
    }
    render() {
        const { usersList, usersListTotal, current } = this.state
        return (
            <Page title="User list-find some fun">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <ListGroup>
                        {usersList.map(user => (
                            <ListGroup.Item key={user.id}>{user.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    {/* <PaginationComponent
                        total={usersListTotal}
                        onChange={this.onListChange}
                    /> */}
                    <Pagination className="mt-5 d-flex justify-content-center">
                        {Array.from(String(usersList.length), Number).map((page, index) => (
                            <Pagination.Item key={`Pagination-${index}`} active={index + 1 === current} onClick={this.onListChange} >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </BaseLayout>
            </Page>
        )
    }
}


export default UserList;
