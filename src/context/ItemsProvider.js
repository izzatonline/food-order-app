import React, { useState, useEffect } from "react";
import ItemsContext from "./items-context";

const ItemsProvider = (props) => {
    const initialData = JSON.parse(localStorage.getItem("itemsData")) || [];
    const [itemsData, setItemsData] = useState(initialData);
    const [switchPage, setSwitchPage] = useState(true);

    useEffect(() => {
        localStorage.setItem("itemsData", JSON.stringify(itemsData));
    }, [itemsData]);

    const addNewItemHandler = (item) => {
        const updatedItems = [...itemsData, item];
        setItemsData(updatedItems);
        localStorage.setItem("itemsData", JSON.stringify(updatedItems));
    };

    const deleteItemHandler = (itemId) => {
        const updatedItems = itemsData.filter((item) => item.id !== itemId);
        setItemsData(updatedItems);
        localStorage.setItem("itemsData", JSON.stringify(updatedItems));
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
