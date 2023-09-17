import { createContext } from "react";

const ItemsContext = createContext({
    itemsData: [],
    switchPage: "true",
    addNewItem: (item) => {},
    removeItem: (id) => {},
    updateItem: (id) => {},
    togglePage: () => {},
});

export const useItemsFromLocalStorage = () => {
    const storedItems = Object.keys(localStorage)
        .filter((key) => key.startsWith("item-"))
        .map((key) => JSON.parse(localStorage.getItem(key)))
        .filter((item) => item && typeof item === "object" && item.id);

    return { itemsData: storedItems };
};

export default ItemsContext;
