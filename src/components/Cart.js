import React, { useContext } from "react";
import ReactDOM from "react-dom";
import {
    Modal,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
    IconButton,
    Box,
    Divider,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CartContext from "../context/cart-context";

const CartModal = ({ onClose }) => {
    const cartCtx = useContext(CartContext);

    const totalItems = cartCtx.items.reduce(
        (acc, curr) => acc + curr.amount,
        0
    );

    const validItems = cartCtx.items.filter((item) => {
        const itemPrice = +item.price;
        if (isNaN(itemPrice)) {
            console.error("Invalid item price:", item);
            return false;
        }
        return true;
    });

    return ReactDOM.createPortal(
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "1px solid #e0e0e0",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Your Cart
                </Typography>
                {totalItems === 0 && (
                    <Typography variant="body1" align="center" gutterBottom>
                        Your cart is empty!
                    </Typography>
                )}
                <List
                    style={{
                        maxHeight: validItems.length > 3 ? "150px" : "auto",
                        overflowY: validItems.length > 3 ? "scroll" : "auto",
                    }}
                >
                    {validItems.map((item) => (
                        <div key={item.id}>
                            <ListItem>
                                <ListItemText
                                    primary={item.title}
                                    secondary={`Price: $${(+item.price).toFixed(
                                        2
                                    )} x ${item.amount}`}
                                />
                                <ListItemSecondaryAction>
                                    <span>{item.amount}</span>
                                    <IconButton
                                        edge="end"
                                        aria-label="increase"
                                        onClick={() =>
                                            cartCtx.addItem({
                                                ...item,
                                                amount: 1,
                                            })
                                        }
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="decrease"
                                        onClick={() =>
                                            cartCtx.removeItem(item.id)
                                        }
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
                <Box display="flex" justifyContent="space-between" mt={3}>
                    <Typography variant="h6">
                        Total Items: {totalItems}
                    </Typography>
                    <Typography variant="h6">
                        Total: ${cartCtx.totalAmount.toFixed(2)}
                    </Typography>
                </Box>
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" color="primary">
                        Order
                    </Button>
                </Box>
            </Box>
        </Modal>,
        document.getElementById("modal-root")
    );
};

export default CartModal;
