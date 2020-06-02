import React, { useState, useEffect } from "react";

import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import BaseLayout from "../layout/base-layout";
import { ListGroup } from "react-bootstrap";
import PaginationComponent from '../components/pagination'
import { apiGetUserList } from "../apis/user.";
//import { UserState } from "../store/modules/user";


interface IProps {
    // total: number;
    // users: {
    //     data: Array<UserState>
    // }
}



const UserList = (props: IProps) => {
    // const { users, total } = props;
    const [usersList, setUsersList] = useState([])
    const [usersListTotal, setUsersListTotal] = useState(0)

    useEffect(() => {
        onListChange({ page: 1 })
        return () => {

        }
    }, [])

    const onListChange = ({ page = 1, size = 10 }) => {
        apiGetUserList({ page, size }).then((res) => {
            setUsersListTotal(res.total)
            setUsersList(res.data)
        })
    }
    return (
        <>
            <Page title="User list-find some fun">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <ListGroup>
                        {usersList.map(user => (
                            <ListGroup.Item>{user.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    <PaginationComponent
                        defaultCurrent={1}
                        total={usersListTotal}
                        onChange={onListChange}
                    />
                </BaseLayout>
            </Page>
        </>
    );
};

UserList.getInitialProps = async ({ ctx }) => {
    // TODO:未知Bug 后台用户列表服务端请求重复两次且数据格式不一致，先不用服务端请求
    // const data = await (await apiGetUserList({ page: 1, size: 10, ctx })) as any
    return {
        // total: data.total,
        // users: data.data
    }
};

export default UserList;
