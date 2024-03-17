import { Layout } from 'antd';
import { MainTitle } from '../../components/MainTitle/MainTitle';
import { MainContent } from '../../components/MainContent/MainContent';
import { MainFooter } from '../../components/MainFooter/MainFooter';
import './MainPage.css'

const { Header, Footer } = Layout;

export function MainPage() {
    return (
        <Layout className='main-page'>
            <Header className='main-page__header'>
                <MainTitle />
            </Header>
            <MainContent className='main-page__content' />
            <Footer className='main-page__footer'>
                <MainFooter/>
            </Footer>
        </Layout>
    );
}