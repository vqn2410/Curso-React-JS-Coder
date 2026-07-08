import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: []
});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        if (!isInCart(item.id)) {
            setCart(prev => [...prev, { ...item, quantity }]);
        } else {
            console.error("El producto ya fue agregado");
        }
    };

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const getProductQuantity = (itemId) => {
        const product = cart.find(prod => prod.id === itemId);
        return product ? product.quantity : 0;
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, total, getProductQuantity, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};
