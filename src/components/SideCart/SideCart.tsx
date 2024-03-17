import { useSelector } from "react-redux";
import qrCode from "../../assets/images/qr-code.webp"
import "./SideCart.css"
import { formatPrice } from "../../utils/fortmatPrice";
import { CartItem } from "../../types/cartItem";
import { RootState } from "../../store/store";

export function SideCart() {
    const cartItems: CartItem[] = useSelector((state: RootState) => state.cart);

    // Функция для вычисления суммы произведений количества товаров на их цену
    const totalAmount = cartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);

    return (
    <section className="side-cart">
        {cartItems.length === 0 ? (
            <p>Добавьте первый товар в корзину.</p>
        ) : (
            <>
                <h2>Итого, руб: {formatPrice(totalAmount)}</h2>
                <h3>QR-код для оплаты</h3>
                <img src={qrCode} alt="QR-код для оплаты покупки" width={300} height={300} />
            </>
        )}
    </section>
    )
}