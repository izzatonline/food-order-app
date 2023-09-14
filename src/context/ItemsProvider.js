import React, { useState } from "react";
import ItemsContext from "./items-context";

const ItemsProvider = (props) => {
    const [itemsData, setItemsData] = useState([]);
    const [switchPage, setSwitchPage] = useState(true);

    const addNewItemHandler = (item) => {
        setItemsData((prevItems) => [...prevItems, item]);
    };

    const deleteItemHandler = (itemId) => {
        setItemsData((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
        );
    };

    const togglePageHandler = () => {
        setSwitchPage((prevSwitch) => !prevSwitch);
    };

    const contextValue = {
        itemsData: itemsData,
        switchPage: switchPage, // providing switchPage state
        addNewItem: addNewItemHandler,
        deleteItem: deleteItemHandler,
        togglePage: togglePageHandler, // providing toggle function
    };

    return (
        <ItemsContext.Provider value={contextValue}>
            {props.children}
        </ItemsContext.Provider>
    );
};

export default ItemsProvider;
