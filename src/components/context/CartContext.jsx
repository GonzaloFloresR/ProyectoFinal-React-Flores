import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState([]);


    const addItem = (item, quantity) => {
        if (isInCart(item.id)){
            let pos = cart.findIndex(produc => produc.id === item.id); //por algún motivo estaba en id y tiraba error
            cart[pos].quantity += quantity;
            setCart([...cart]);
        } else {
            setCart([...cart, {...item, quantity:quantity}]);
        }
    }


    const removeItem = (id) => {
        const items = cart.filter(produc => produc.id != id);
        setCart([...items]);
    }


    const clear = () => {
        setCart([]);
    }


    const isInCart = (id) => {
        return cart.some(item => item.id === id);
    }

    const cartTotalProductos = () => {
        return cart.reduce((acumulador, produc) => acumulador += produc.quantity, 0);
    }

    const sumatotalProductos = () => {
        return cart.reduce((acumulador, producto) => acumulador += producto.quantity * producto.precio , 0);
    }


    return (
        <CartContext.Provider value={{cart, addItem, removeItem, clear, cartTotalProductos, sumatotalProductos}}> 
            {children}
        </CartContext.Provider>
    )

}

export default CartContextProvider;