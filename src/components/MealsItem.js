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

    const handleAddToCart = () => {
        cartCtx.addItem({
            id: food.id,
            title: food.name,
            price: food.price,
            amount: 1,
        });
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="194"
                    image={`data:image/jpeg;base64,${food.image}`}
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
                <Button size="small" color="primary" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
                {admin && (
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
