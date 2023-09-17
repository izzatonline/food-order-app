import React, { useState, useEffect } from "react";
import ItemsContext, { useItemsFromLocalStorage } from "./items-context";

const ItemsProvider = (props) => {
    const initialItems = useItemsFromLocalStorage().itemsData || [];
    const [itemsData, setItemsData] = useState(initialItems);
    const [switchPage, setSwitchPage] = useState(true);

    useEffect(() => {
        itemsData.forEach((item) => {
            localStorage.setItem("item-" + item.id, JSON.stringify(item));
        });
    }, [itemsData]);

    const addNewItemHandler = (item) => {
        setItemsData((prevItems) => [...prevItems, item]);
        localStorage.setItem("item-" + item.id, JSON.stringify(item));
    };

    const deleteItemHandler = (itemId) => {
        setItemsData((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
        );

        localStorage.removeItem("item-" + itemId);
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
