import React, { useContext, useState } from "react";
import Cart from "../components/Cart";
import Meals from "../components/Meals";
import AppBarComponent from "../components/AppBarComponent";
import { Grid } from "@mui/material";
import CartContext from "../context/cart-context";
import ItemsContext from "../context/items-context";
// import "../App.css";

const Users = () => {
    const itemsCtx = useContext(ItemsContext);
    const [isValid, setIsValid] = useState(false);
    const cartCtx = useContext(CartContext);

    if (itemsCtx.switchPage) {
        return null;
    }

    const showModalHandler = () => {
        setIsValid(true);
    };
    const hideModalHandler = () => {
        setIsValid(false);
    };

    return (
        <Grid container className="main-container" direction={"column"}>
            <Grid
                className="header-container"
                item
                lg={1}
                style={{ maxHeight: "10vh" }}
                marginBottom={2}
            >
                <AppBarComponent modalHandler={showModalHandler} />
                {isValid && (
                    <Cart items={cartCtx.items} onClose={hideModalHandler} />
                )}
            </Grid>
            <Grid className="content-container" item lg={11}>
                <Grid container direction="row" style={{ height: "100%" }}>
                    <Grid
                        className="left-panel-container"
                        item
                        lg="2"
                        marginRight={3}
                    >
                        <div></div>
                    </Grid>
                    <Grid className="result-container" item lg="9.5">
                        <Grid item marginY={5}>
                            <Meals />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Users;
