import React, { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { createClient } from "contentful-management";

const SPACE_ID = "8qhx6lxj8iz9";
const ACCESS_TOKEN = "CFPAT-O0LKlsAaYGkI1YnVhM1TfBUeI5OkSRjHTLGPDC3BqR0";
const CONTENT_TYPE_ID = "7jvmhc1XArPBfdGlXMfe41"; // If you have a specific content type for the images

const client = createClient({
    accessToken: ACCESS_TOKEN,
});

const Form = (props) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [enteredPrice, setEnteredPrice] = useState("");
    const [imageData, setImageData] = useState("");

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        // Create the asset on Contentful
        const space = await client.getSpace(SPACE_ID);
        const asset = await space.createAssetFromFiles({
            fields: {
                title: {
                    "en-US": file.name,
                },
                description: {
                    "en-US": "Some description about the image", // You can make this dynamic
                },
                file: {
                    "en-US": {
                        contentType: file.type,
                        fileName: file.name,
                        file: file,
                    },
                },
            },
        });

        await asset.processForAllLocales({ processingCheckWait: 2000 }); // Process the uploaded asset
        await asset.publish(); // You can also decide to publish it immediately

        // Now, the asset is available in Contentful, and you can use its ID for references or its URL for display
        setFoodData((prevData) => ({
            ...prevData,
            image: asset.fields.file["en-US"].url, // Or asset.sys.id if you want to save the ID
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newFood = {
            id: Math.random().toString(),
            name: enteredName,
            description: enteredDescription,
            price: parseFloat(enteredPrice).toFixed(2),
            image: imageData,
        };

        props.onSubmit(newFood);
        resetForm();
    };

    const resetForm = () => {
        setEnteredName("");
        setEnteredDescription("");
        setEnteredPrice("");
        setImageData("");
    };

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Add New Food Item</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    value={enteredName}
                    onChange={(e) => setEnteredName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    value={enteredDescription}
                    onChange={(e) => setEnteredDescription(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    type="number"
                    fullWidth
                    value={enteredPrice}
                    onChange={(e) => setEnteredPrice(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Form;
