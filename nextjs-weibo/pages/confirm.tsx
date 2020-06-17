import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import MyButton from '../components/Button'
import Page from "../components/page";

import SocialMeta from "../components/social-meta";
import webConfig from "../config/config";
import BaseLayout from '../layout/base-layout';
function Comfirm() {
    const onComfirm = () => {

    }
    return (
        <>
            <Page title="验证-微博-随时随地发现新鲜事">
                <SocialMeta {...webConfig.theme} />
                <BaseLayout>
                    <Jumbotron>
                        <h1>感谢您在 Weibo App 网站进行注册！</h1>
                        <p>
                            请点击下面的链接完成注册：
                </p>
                        <p>
                            <MyButton
                                onClick={onComfirm}
                            >
                                邮箱验证
                    </MyButton>
                        </p>
                    </Jumbotron>
                </BaseLayout>
            </Page>

        </>
    )
}

export default Comfirm