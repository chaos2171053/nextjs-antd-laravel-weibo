import React, { useState, useEffect, memo, useCallback } from "react";

import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import BaseLayout from "../layout/base-layout";
import { ListGroup, Pagination, Row, Col, Button } from "react-bootstrap";
import PaginationComponent from '../components/pagination'
import { apiGetUserList } from "../apis/user";
import { UserState } from "../store/modules/user";
import UserContainer from '../container/user';
import { apiDestoryUser } from '../apis/user'
import MyButton from '../components/Button'
interface IProps {
    // total: number;
    // users: {
    //     data: Array<UserState>
    // }
    userInfo: UserState;
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
        this.onDeleteUser = this.onDeleteUser.bind(this)
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
    onDeleteUser(id) {
        return new Promise((resolve, reject) => {
            apiDestoryUser(id).then(() => {
                this.setState({
                    usersList: this.state.usersList.filter((user) => user.id !== id)
                })
                resolve()
            })
        })

    }
    render() {
        const { usersList, usersListTotal, current } = this.state
        const { userInfo } = this.props
        return (
            <Page title="User list-find some fun">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <ListGroup>
                        {usersList.map(user => (
                            <ListGroup.Item key={user.id}>
                                <Row>
                                    <Col sm={10}>    {user.name}</Col>
                                    <Col sm={2}>
                                        {userInfo.id === 1 && user.id !== userInfo.id && <MyButton variant="danger" onClick={() => this.onDeleteUser(user.id)}>Delete</MyButton>}
                                    </Col>
                                </Row>

                            </ListGroup.Item>
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


export default UserContainer(UserList);
