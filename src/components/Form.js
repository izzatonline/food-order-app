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
    const [imageData, setImageData] = useState("");

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const space = await client.getSpace(CONTENTFUL_SPACE_ID);
                const environment = await space.getEnvironment(
                    CONTENTFUL_ENVIRONMENT_ID
                );

                const asset = await environment.createAssetFromFiles({
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

                const processedAsset = await asset.processForAllLocales();

                // Check if asset is already published
                if (processedAsset.sys.publishedVersion) {
                    console.log("Asset is already published.");
                } else {
                    await processedAsset.publish();
                    const imageUrl = processedAsset.fields.file["en-US"].url;
                    setImageData("https:" + imageUrl);
                }
            } catch (error) {
                console.error("Error uploading the image:", error);
            }
        }
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
