import React, { useContext, useState } from "react";
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import CartContext from "../context/cart-context";

const MealsItem = ({ food, admin, onDelete }) => {
    const cartCtx = useContext(CartContext);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const itemFromLocalStorage = JSON.parse(localStorage.getItem(food.id));
    const itemData = itemFromLocalStorage ? itemFromLocalStorage : food;
    const imageUrl = itemData.image;

    const handleAddToCart = () => {
        cartCtx.addItem({
            id: food.id,
            title: food.name,
            price: food.price,
            amount: 1,
        });
    };

    const handleDelete = () => {
        localStorage.removeItem(food.id);
        onDelete(food.id);
    };

    const openDeleteConfirmation = () => {
        setOpenDeleteDialog(true);
    };

    const closeDeleteConfirmation = () => {
        setOpenDeleteDialog(false);
    };

    const confirmDelete = () => {
        handleDelete();
        closeDeleteConfirmation();
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
                        onClick={openDeleteConfirmation}
                    >
                        Delete
                    </Button>
                )}
            </CardActions>

            <Dialog open={openDeleteDialog} onClose={closeDeleteConfirmation}>
                <DialogTitle>{"Delete Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete{" "}
                        <strong>{food.name}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteConfirmation} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default MealsItem;
