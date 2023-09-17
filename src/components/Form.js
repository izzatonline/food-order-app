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
import { v4 as uuidv4 } from "uuid";

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
            const reader = new FileReader();

            reader.onload = function (evt) {
                setImageData(evt.target.result);
            };

            reader.readAsDataURL(file);

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

                await asset.processForAllLocales();

                if (!asset.sys.publishedVersion) {
                    await asset.publish();
                }
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

        const newFoodId = uuidv4();

        const newFood = {
            id: newFoodId,
            name: enteredName,
            description: enteredDescription,
            price: parseFloat(enteredPrice).toFixed(2),
            image: imageData,
        };

        localStorage.setItem(`item-${newFoodId}`, JSON.stringify(newFood));

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
