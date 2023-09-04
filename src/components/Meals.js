import React, { useContext } from "react";
import ItemsContext from "../context/items-context";
import MealsItem from "./MealsItem";
import { Grid } from "@mui/material";

const Meals = (props) => {
    const itemsCtx = useContext(ItemsContext);

    const handleDelete = (itemId) => {
        itemsCtx.deleteItem(itemId);
    };

    return (
        <Grid container spacing={3}>
            {itemsCtx.itemsData.map((food) => (
                <Grid item xs={12} sm={4} key={food.id}>
                    <MealsItem
                        food={food}
                        onDelete={handleDelete}
                        admin={props.admin}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Meals;
