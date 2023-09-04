import React, { useContext } from "react";
import ReactDOM from "react-dom";
import {
    Modal,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CartContext from "../context/cart-context";

const CartModal = ({ onClose }) => {
    const cartCtx = useContext(CartContext);

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
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <h2>Your Cart</h2>
                <List>
                    {cartCtx.items.map((item) => (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={item.title}
                                secondary={`Price: $${item.price} x ${item.amount}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="increase"
                                    onClick={() =>
                                        cartCtx.addItem({ ...item, amount: 1 })
                                    }
                                >
                                    <AddIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="decrease"
                                    onClick={() => cartCtx.removeItem(item.id)}
                                >
                                    <RemoveIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Button onClick={onClose}>Close</Button>
                <Button>Order</Button>
            </Box>
        </Modal>,
        document.getElementById("modal-root")
    );
};

export default CartModal;
