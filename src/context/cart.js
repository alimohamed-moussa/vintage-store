import React from 'react';
import localCart from '../utils/localCart';

const CartContext = React.createContext();

function getCartFromTheLocalStorage() {
    return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
}

function CartProvider({ children }) {

    const [cart, setCart] = React.useState(getCartFromTheLocalStorage());
    const [total, setTotal] = React.useState(0);
    const [cartItems, setCartItems] = React.useState(0);

    React.useEffect(()=> {

        //local storage
        localStorage.setItem('cart', JSON.stringify(cart));


        //cart items
        let newCartItems = cart.reduce((total, cartItem)=> {
            return (total += cartItem.amount);
        }, 0);
        setCartItems(newCartItems);

        //Cart total
        let newTotal = cart.reduce((total, cartItem)=>{
            return total += (cartItem.amount*cartItem.price); 
        }, 0);
        newTotal = parseFloat(newTotal.toFixed(2));
        setTotal(newTotal);

    }, [cart]);

    //Remove items
    const removeItem = id => {
        setCart([...cart].filter(item => item.id !== id));
    };

    //increase amount
    const increaseAmount = id => {
        let newCart = [...cart].map(item => {
            return item.id === id? {...item, amount:item.amount+1}:{...item};
        });

        setCart(newCart);
    }

    //decrease amount
    const decreaseAmount = (id, amount) => {
        if (amount === 1) {
            removeItem(id);
            return;
        } else {
            let newCart = [...cart].map(item => {
                return item.id === id? {...item, amount:item.amount - 1}:{...item};
            });
            setCart(newCart);
        }  
    };

    //add to cart
    const addToCart = product => {
        const {id, image, title, price} = product;
        const item = [...cart].find(item => item.id === id);
        if(item) {
            increaseAmount(id);
            return;
        }else {
            const newItem = {id, image, title, price, amount:1};
            const newCart = [...cart, newItem];
            setCart(newCart);
        }
    }

    //clear cart
    const clearCart = () => {
        setCart([]);
    }

    return( 
        <CartContext.Provider value={ {cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart} }>
            {children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProvider};