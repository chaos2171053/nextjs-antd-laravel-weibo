import React, { useEffect, useState } from "react";
import Page from "../../../components/page";
import SocialMeta from "../../../components/social-meta";
import BaseLayout from "../../../layout/base-layout";
import webConfig from '../../../config/config'
import { useRouter } from 'next/router'
import { Media, Pagination } from "react-bootstrap";
import { apiGetStatusListByUserId } from "../../../apis/status";
interface IProps {
}


const StatusPage = (props: IProps) => {
    const { } = props;
    const router = useRouter()
    const { id } = router.query
    const [statusList, setStatusList] = useState([])
    const [statusListTotal, setStatusListTotal] = useState(0)
    const [statusListCurrentPage, setStatusListCurrentPage] = useState(1)

    const getStatusList = (page) => {
        apiGetStatusListByUserId({ id: +id, page: page }).then((res: any) => {
            setStatusListTotal(res.total)
            setStatusList(res.data)
        }).catch(e => {

        })
    }
    useEffect(() => {
        getStatusList(1)
        return () => {

        }
    }, [])
    const onPageChange = (e) => {
        const page = +e.target.text
        setStatusListCurrentPage(page)
        getStatusList(page)
    }

    return (
        <>
            <Page title="weibo-find some fun">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    {statusList.map((status, index) => {
                        return (
                            <ul className="list-unstyled">
                                <Media key={`weibo-${status.id}`} as="li">
                                    <img
                                        width={64}
                                        height={64}
                                        className="align-self-start mr-3"
                                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_172cbb26d53%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_172cbb26d53%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2212.390625%22%20y%3D%2236.8%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                        alt="Generic placeholder"
                                    />
                                    <Media.Body>
                                        <h5>{status.name}</h5>
                                        <p>
                                            {status.content}
                                        </p>
                                    </Media.Body>
                                </Media>
                            </ul>
                        )
                    })}
                    <Pagination className="mt-5 d-flex justify-content-center">
                        {Array.from(String(statusListTotal), Number).map((page, index) => (
                            <Pagination.Item key={`Pagination-${index}`} active={index + 1 === statusListCurrentPage} onClick={onPageChange} >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </BaseLayout>
            </Page>
        </>
    );
};

StatusPage.getInitialProps = async context => {

    return {}
};


export default StatusPage;
