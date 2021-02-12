import { Layout, Typography } from 'antd';
import Dashboard from './components/Dashboard';

const App = () => {
    const { Header, Footer, Content } = Layout;

    return (
        <Layout>
            <Header className={'header'}>
                <Typography.Title level={1}>Dashboard</Typography.Title>
            </Header>
            <Content className={'site-layout'}>
                <div className={'site-layout-background'}>
                    <Dashboard/>
                </div>
            </Content>
            <Footer className={'footer'}>&copy; 2021</Footer>
        </Layout>

    );
};

export default App;
