import * as React from 'react';
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
/**
 * 普通用户布局
 */
export default () => {
    return <Layout>
        <Sider></Sider>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
    </Layout>
}
