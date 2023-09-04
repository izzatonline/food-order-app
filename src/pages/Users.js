import { useState } from "react";
import CartProvider from "../context/CartProvider";
import Cart from "../components/Cart";
// import Banner from "../components/Banner";
// import AboutUs from "../components/AboutUs";
import Meals from "../components/Meals";
import AppBarComponent from "../components/AppBarComponent";
import "../App.css";

const Users = () => {
    const [isValid, setIsValid] = useState(false);
    const showModalHandler = () => {
        setIsValid(true);
    };
    const hideModalHandler = () => {
        setIsValid(false);
    };
    return (
        <div className="usersPage">
            <CartProvider>
                <AppBarComponent modalHandler={showModalHandler} />
                {isValid && <Cart hideModalHandler={hideModalHandler} />}
                {/* <Banner /> */}
                <section>
                    {/* <AboutUs /> */}
                    <div style={{ marginTop: "15rem" }} className="top-margin">
                        <Meals />
                    </div>
                </section>
            </CartProvider>
        </div>
    );
};

export default Users;
