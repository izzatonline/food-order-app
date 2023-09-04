import React, { useContext } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActionArea,
    CardActions,
} from "@mui/material";
import CartContext from "../context/cart-context";

const MealsItem = ({ food, admin, onDelete }) => {
    // Added admin and onDelete
    const cartCtx = useContext(CartContext);

    const handleAddToCart = () => {
        cartCtx.addItem({
            id: food.id,
            title: food.title,
            price: food.price,
            amount: 1,
        });
    };

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={food.title}
                    height="140"
                    image={`data:image/jpeg;base64,${food.image}`}
                    title={food.title}
                />
                <CardContent>
                    <Typography variant="h5">{food.title}</Typography>
                    <Typography>{food.description}</Typography>
                    <Typography>
                        ${parseFloat(food.price).toFixed(2)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
                {admin && ( // Conditionally render the Delete button for admin
                    <Button
                        size="small"
                        color="secondary"
                        onClick={() => onDelete(food.id)}
                    >
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default MealsItem;
