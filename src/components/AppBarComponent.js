import React, { useContext, useState } from "react";
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../context/cart-context";
import CartModal from "./Cart";

const AppBarComponent = () => {
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce(
        (acc, curr) => acc + curr.amount,
        0
    );

    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCartModal = () => {
        setIsCartOpen((prevState) => !prevState);
    };

    return (
        <AppBar position="sticky" style={{ top: 0 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Food Order App
                </Typography>

                <IconButton color="inherit" onClick={toggleCartModal}>
                    <Badge badgeContent={numberOfCartItems} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
            {isCartOpen && <CartModal onClose={toggleCartModal} />}{" "}
        </AppBar>
    );
};

export default AppBarComponent;
