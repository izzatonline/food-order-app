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

    console.log("Image URL for food:", food.name, "is:", food.image);

    // Since we are saving the entire item, including the Contentful image URL, in local storage,
    // there's no need to get the image from local storage here. We can use food.image directly.
    // const imageUrl = food.image;

    const handleAddToCart = () => {
        cartCtx.addItem({
            id: food.id,
            title: food.name,
            price: food.price,
            amount: 1,
        });
    };

    // Handle delete
    const handleDelete = () => {
        onDelete(food.id); // Continue with the deletion process
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="194"
                    image={food.image}
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
