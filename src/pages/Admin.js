// Admin.js
import React, { useContext } from "react";
import AppBarComponent from "../components/AppBarComponent";
import ItemsContext from "../context/items-context";
import Meals from "../components/Meals";
import { Button } from "@mui/material";
import Form from "../components/Form";
import "../App.css";

const Admin = () => {
    const itemsCtx = useContext(ItemsContext);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (newFood) => {
        itemsCtx.addNewItem(newFood);
        handleClose();
    };

    return (
        <div className="adminPage">
            <AppBarComponent />
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                style={{ margin: "20px 0" }}
            >
                Add Food Item
            </Button>
            <Meals admin={true} />
            <Form
                open={open}
                handleClose={handleClose}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default Admin;
