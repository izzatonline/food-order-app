import "./App.css";
import React, { Fragment } from "react";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import ItemsProvider from "./context/ItemsProvider";
import CartProvider from "./context/CartProvider";

function App() {
    return (
        <ItemsProvider>
            <CartProvider>
                <div className="main-content">
                    <Fragment>
                        <Users />
                        <Admin />
                    </Fragment>
                </div>
                <Footer className="footer" />
            </CartProvider>
        </ItemsProvider>
    );
}

export default App;
