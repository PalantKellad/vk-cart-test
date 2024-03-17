import { Layout, Space } from 'antd';
import { ProductCard } from '../ProductCard/ProductCard';
import { SideCart } from '../SideCart/SideCart';
const { Sider, Content } = Layout;
import './MainContent.css'
import { useGetProductsQuery } from '../../services/productsApi';
import { Product } from '../../types/Product';

type MainContentProps = {
    className: string
}

export function MainContent({ className }: MainContentProps): React.JSX.Element {

    const { data, error, isLoading } = useGetProductsQuery({});

    // Не знаю, что тут с типами делать.
    if (error) return <div>Error: {error.status} {JSON.stringify(error.data)}</div>;

    return (
        <Layout className={className}>
            <Content className="main-content">
                {isLoading ? (
                    <div>Загружаем ваши товары...</div>
                ) : (
                    <div style={{ display: 'grid' }}>
                        <Space direction="vertical" size={16}>
                            {data.map((item: Product) => {
                                return (
                                    <ProductCard key={item.id} item={item} />
                                )
                            })}
                        </Space>
                    </div>
                )}
            </Content>
            <Sider width="25%" className="side-content" style={{ background:'#1677ff'}}>
                <SideCart />
            </Sider>
        </Layout>
    )
}