import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            const updatedTotalAmount =
                state.totalAmount + action.item.price * action.item.amount;
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };

        case "REMOVE":
            const itemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            const item = state.items[itemIndex];
            let newTotalAmount;

            if (item.amount > 1) {
                newTotalAmount = state.totalAmount - item.price;
            } else {
                newTotalAmount = state.totalAmount - item.price;
            }

            let newItems;
            if (item.amount > 1) {
                const updatedItem = { ...item, amount: item.amount - 1 };
                newItems = [...state.items];
                newItems[itemIndex] = updatedItem;
            } else {
                newItems = state.items.filter((item) => item.id !== action.id);
            }

            return {
                items: newItems,
                totalAmount: Math.max(0, newTotalAmount),
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
