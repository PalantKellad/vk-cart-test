import Icon, { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, InputNumber } from "antd";
import './ProductCard.css'
import { formatPrice } from "../../utils/fortmatPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setQuantity } from '../../store/slices/cartSlice';
import { useState } from "react";
import type { GetProps } from 'antd';
import type { Product } from "../../types/Product";
import type { RootState } from "../../store/store";

type CustomIconComponentProps = GetProps<typeof Icon>;

type ProductCardProps = {
    item: Product
}

const addToCartSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" /></svg>
)

const removeFromCartSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-640v-80h240v80H360ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" /></svg>
)

const AddToCartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={addToCartSvg} {...props} />
);

const RemoveFromCartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={removeFromCartSvg} {...props} />
);

export function ProductCard({ item }: ProductCardProps) {

    const cartItem = useSelector((state: RootState) => state.cart.find(cartItem => cartItem.id === item.id));
    const [quantity, setQuantityLocal] = useState(cartItem ? cartItem.quantity : 1);

    const dispatch = useDispatch();

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (product: Product) => {
        dispatch(removeFromCart(product.id));
    };

    const handleIncreaseQuantity = () => {
        if (quantity < 10) {
            dispatch(increaseQuantity(item.id));
            setQuantityLocal(prevQuantity => prevQuantity + 1);
        }
    };

    const handleDecreaseQuantity = (product: Product) => {
        dispatch(decreaseQuantity(product.id));
        setQuantityLocal(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleChangeQuantity = (newValue: number | null) => {
        if (newValue !== null) {
            setQuantityLocal(newValue);
            dispatch(setQuantity({ id: item.id, quantity: newValue }));
        }
    };

    return (
        // Здесь приходится делать обёртки внутри, потому что родительский компонент Card сам обёртка, и на него плохо вешается grid-template-areas. А ставить в кнопки в предусмотренные компонентом слоты actions тоже не очень красиво выходит
        <Card className="product-card" title={item.title}>
            <img className="product-card__image" src={item.image} alt={item.title} width={228} height={326} />
            <p className="product-card__description">{item.description}</p>
            <div className="product-card__order-info">
                <b className="product-card__price">Цена: {formatPrice(item.price)}</b>
                <p className="product-card__instock">В наличии: {10}</p>
                {cartItem ? (
                    <>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => handleRemoveFromCart(item)}
                            className="product-card__order-button"
                            danger
                            icon={<RemoveFromCartIcon />}>
                            Удалить из корзины
                        </Button>
                        <div className="product-card__order-quantity">
                            <Button
                                aria-label="Плюс один товар"
                                type="default"
                                size="large"
                                onClick={() => handleDecreaseQuantity(item)}
                                shape="circle"
                                danger
                                disabled={quantity === 1}
                            >
                                <MinusOutlined />
                            </Button>
                            <InputNumber
                                min={1}
                                max={10}
                                onChange={handleChangeQuantity}
                                defaultValue={quantity}
                                value={quantity}
                                size="large" />
                            <Button
                                aria-label="Минус один товар"
                                type="default"
                                size="large"
                                onClick={() => handleIncreaseQuantity()}
                                shape="circle"
                                disabled={quantity === 10}
                            >
                                <PlusOutlined />
                            </Button>
                        </div>
                    </>
                ) : (
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => handleAddToCart(item)}
                        className="product-card__order-button"
                        icon={<AddToCartIcon />}>
                        Добавить в корзину
                    </Button>
                )
                }
            </div>
        </Card>
    )
}