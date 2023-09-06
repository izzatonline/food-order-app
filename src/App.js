import "./App.css";
import React, { useContext, Fragment, useState, useEffect } from "react";
import ItemsContext from "./context/items-context";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import ItemsProvider from "./context/ItemsProvider"; // <-- Ensure this path is correct
import CartProvider from "./context/CartProvider"; // <-- Ensure this path is correct

function App() {
    const itemsCtx = useContext(ItemsContext);
    const [localSwitch, setLocalSwitch] = useState(true);

    useEffect(() => {
        setLocalSwitch(itemsCtx.switchPage);
    }, [itemsCtx.switchPage]);

    return (
        <ItemsProvider>
            <CartProvider>
                <div className="main-content">
                    {localSwitch ? <Users /> : <Admin />}
                </div>
                <Footer className="footer" />
            </CartProvider>
        </ItemsProvider>
    );
}

export default App;
