import React, { useState } from "react";
import ItemsContext from "./items-context";

const ItemsProvider = (props) => {
    const [itemsData, setItemsData] = useState([]);

    const addNewItemHandler = (item) => {
        setItemsData((prevItems) => [...prevItems, item]);
    };

    const deleteItemHandler = (itemId) => {
        setItemsData((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
        );
    };

    const contextValue = {
        itemsData: itemsData,
        addNewItem: addNewItemHandler,
        deleteItem: deleteItemHandler,
    };

    return (
        <ItemsContext.Provider value={contextValue}>
            {props.children}
        </ItemsContext.Provider>
    );
};

export default ItemsProvider;
