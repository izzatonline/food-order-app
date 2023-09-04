// CartProvider.js
import React, { useReducer } from "react";
import CartContext from "./cart-context";

// A basic reducer to manage cart operations
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // logic to add item to cart
            const updatedItems = state.items.concat(action.item);
            const updatedTotalAmount = state.totalAmount + action.item.amount;
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };

        case "REMOVE":
            // logic to remove item from cart by ID
            const updatedItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            const updatedItem = state.items[updatedItemIndex];
            const decreasedTotalAmount = state.totalAmount - updatedItem.amount;
            const updatedItemsArray = [...state.items];
            updatedItemsArray.splice(updatedItemIndex, 1);
            return {
                items: updatedItemsArray,
                totalAmount: decreasedTotalAmount,
            };

        case "CLEAR":
            return { items: [], totalAmount: 0 };

        default:
            return state;
    }
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, {
        items: [],
        totalAmount: 0,
    });

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR" });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
