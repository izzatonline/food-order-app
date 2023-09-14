import React, { useContext } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActionArea,
    CardActions,
    CardHeader,
    Grid,
} from "@mui/material";
import CartContext from "../context/cart-context";

const MealsItem = ({ food, admin, onDelete }) => {
    const cartCtx = useContext(CartContext);

    // Get image from localStorage or fall back to the provided URL
    const imageFromLocalStorage = localStorage.getItem(food.id);
    const imageUrl = imageFromLocalStorage ? imageFromLocalStorage : food.image;

    const handleAddToCart = () => {
        cartCtx.addItem({
            id: food.id,
            title: food.name,
            price: food.price,
            amount: 1,
        });
    };

    // Handle delete which includes removing image from local storage
    const handleDelete = () => {
        localStorage.removeItem(food.id); // Removing image from local storage using the food ID as the key
        onDelete(food.id); // Continue with the rest of the deletion process
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="194"
                    image={imageUrl}
                    alt={food.name}
                />
                <Grid
                    container
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems="center"
                >
                    <Grid item>
                        <CardHeader
                            title={
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    {food.name}
                                </Typography>
                            }
                            subheader={
                                <Typography variant="body2" fontWeight="bold">
                                    {food.description}
                                </Typography>
                            }
                        />
                    </Grid>
                    <Grid item>
                        <CardContent>
                            <Typography>
                                ${parseFloat(food.price).toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
            <CardActions disableSpacing>
                {!admin && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                )}
                {admin && (
                    <Button
                        size="small"
                        color="secondary"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default MealsItem;
