import React, { useState, useEffect } from "react";
import ItemsContext from "./items-context";

const ItemsProvider = (props) => {
    const initialData = JSON.parse(localStorage.getItem("itemsData")) || [];
    const [itemsData, setItemsData] = useState(initialData);
    const [switchPage, setSwitchPage] = useState(true);

    // useEffect to sync state with localStorage
    useEffect(() => {
        localStorage.setItem("itemsData", JSON.stringify(itemsData));
    }, [itemsData]);

    const addNewItemHandler = (item) => {
        console.log("Received new item:", item); // logging the incoming item

        // Use the functional form of setState
        setItemsData((prevItemsData) => [...prevItemsData, item]);
    };

    const deleteItemHandler = (itemId) => {
        // Use the functional form of setState
        setItemsData((prevItemsData) =>
            prevItemsData.filter((item) => item.id !== itemId)
        );
    };

    const togglePageHandler = () => {
        setSwitchPage((prevSwitch) => !prevSwitch);
    };

    const contextValue = {
        itemsData: itemsData,
        switchPage: switchPage,
        addNewItem: addNewItemHandler,
        deleteItem: deleteItemHandler,
        togglePage: togglePageHandler,
    };

    return (
        <ItemsContext.Provider value={contextValue}>
            {props.children}
        </ItemsContext.Provider>
    );
};

export default ItemsProvider;
