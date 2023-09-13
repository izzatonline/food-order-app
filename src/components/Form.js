import React, { useState } from "react";
import { createClient } from "contentful-management";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

const CONTENTFUL_SPACE_ID = "8qhx6lxj8iz9";
const CONTENTFUL_ENVIRONMENT_ID = "master";
const CONTENTFUL_CMA_TOKEN =
    "CFPAT-5gNA4_L4uVRbcrGykKSVOgr9FrS7oqpIDg71aXPVIDU";

const client = createClient({
    accessToken: CONTENTFUL_CMA_TOKEN,
});

const Form = (props) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [enteredPrice, setEnteredPrice] = useState("");
    const [imageURL, setImageURL] = useState(""); // Changed name to imageURL

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const space = await client.getSpace(CONTENTFUL_SPACE_ID);
                const environment = await space.getEnvironment(
                    CONTENTFUL_ENVIRONMENT_ID
                );

                let asset = await environment.createAssetFromFiles({
                    fields: {
                        title: {
                            "en-US": file.name,
                        },
                        description: {
                            "en-US": "Uploaded Image Description",
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

                await asset.processForAllLocales();

                // Fetch the latest version of the asset before publishing
                asset = await environment.getAsset(asset.sys.id);

                // Now you're working with the instance returned by the SDK
                // This should have the `.publish()` method
                try {
                    await asset.publish();
                } catch (publishError) {
                    console.error("Error publishing the asset:", publishError);
                }

                // Debugging: Check the published version after publishing
                const updatedAsset = await environment.getAsset(asset.sys.id);
                console.log(
                    "Asset published version:",
                    updatedAsset.sys.publishedVersion
                );

                // Set the imageURL to the Contentful URL
                const imageUrl = asset.fields.file["en-US"].url;
                setImageURL(`https:${imageUrl}`);
            } catch (error) {
                console.error(
                    "Error uploading the image to Contentful:",
                    error
                );
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newFoodId = Math.random().toString();

        const newFood = {
            id: newFoodId,
            name: enteredName,
            description: enteredDescription,
            price: parseFloat(enteredPrice).toFixed(2),
            image: imageURL,
        };

        props.onSubmit(newFood);
        resetForm();
    };

    const resetForm = () => {
        setEnteredName("");
        setEnteredDescription("");
        setEnteredPrice("");
        setImageURL("");
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
