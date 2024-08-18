import { getCart } from '@/actions/server';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartDetail, setCartDetail] = useState([]);
   
    
    useEffect(() => {
       getCart().then((data)=>{
        if(!data)
        {
            setCartDetail([])
        }
         setCartDetail(data)
       })
        
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
