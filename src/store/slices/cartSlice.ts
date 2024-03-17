import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cartItem';

export interface CartState extends Array<CartItem> { }

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as CartState,
    reducers: {
        addToCart: (state, action) => {
            const { id, price } = action.payload;
            const existingItem = state.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ id, price, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.find((item) => item.id === id);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        setQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setQuantity } = cartSlice.actions;

export default cartSlice.reducer;