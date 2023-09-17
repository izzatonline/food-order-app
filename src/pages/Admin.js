import React, { useContext } from "react";
import AppBarComponent from "../components/AppBarComponent";
import ItemsContext from "../context/items-context";
import Meals from "../components/Meals";
import { Button, Grid } from "@mui/material";
import Form from "../components/Form";
import "../App.css";
import SideBar from "../components/SideBar";

const Admin = () => {
    const itemsCtx = useContext(ItemsContext);
    const [open, setOpen] = React.useState(false);

    if (itemsCtx.switchPage) {
        return null;
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (newFood) => {
        itemsCtx.addNewItem(newFood);
        handleClose();
    };

    return (
        <Grid container className="main-container" direction={"column"}>
            <Grid
                className="header-container"
                item
                lg={1}
                style={{ maxHeight: "10vh", overflowY: "visible" }}
                marginBottom={2}
            >
                <AppBarComponent />
            </Grid>
            <Grid className="content-container" item lg={11}>
                <Grid container direction="row" style={{ height: "100%" }}>
                    <Grid
                        className="left-panel-container"
                        item
                        lg="2"
                        marginRight={3}
                    >
                        <SideBar style={{ overflowY: "scroll" }}></SideBar>
                    </Grid>
                    <Grid className="result-container" item lg="8">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}
                            style={{ margin: "1px 0" }}
                        >
                            Add Food Item
                        </Button>
                        <Grid item marginY={5}>
                            <Meals admin={true} />
                            <Form
                                open={open}
                                handleClose={handleClose}
                                onSubmit={handleSubmit}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Admin;
