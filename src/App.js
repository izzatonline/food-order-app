import "./App.css";
import { Fragment, useState } from "react";
import ItemsContext from "./context/items-context";
import CartContext from "./context/cart-context"; // <-- Import CartContext here
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

function App() {
    // For Items
    const [switchPage, setSwitchPage] = useState(true);
    const [itemsData, setItemsData] = useState([]);

    // For Cart <-- New state for cart
    const [cartItems, setCartItems] = useState([]);

    const addNewItem = (newItem) => {
        setItemsData((prevItems) => [...prevItems, newItem]);
    };

    const removeItem = (itemId) => {
        setItemsData((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
        );
    };

    const updateItem = (updatedItem) => {
        setItemsData((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    // Cart Management Functions <-- New functions for cart management
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
        );
    };

    return (
        <ItemsContext.Provider
            value={{
                switchPage: switchPage,
                togglePage: () => {
                    setSwitchPage((prevSwitchPage) => !prevSwitchPage);
                },
                itemsData: itemsData,
                addNewItem: addNewItem,
                removeItem: removeItem,
                updateItem: updateItem,
            }}
        >
            <CartContext.Provider
                value={{
                    items: cartItems,
                    addItem: addToCart,
                    removeItem: removeFromCart,
                }}
            >
                <div className="main-content">
                    <Fragment>{switchPage ? <Users /> : <Admin />}</Fragment>
                </div>
                <Footer className="footer" />
            </CartContext.Provider>
        </ItemsContext.Provider>
    );
}

export default App;
