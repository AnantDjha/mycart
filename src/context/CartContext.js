import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartDetail, setCartDetail] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cartItem") || "[]");
        setCartDetail(storedCart);
    }, []);

    return (
        <CartContext.Provider value={{ cartDetail, setCartDetail }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
