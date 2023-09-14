import React, { useContext } from "react";
import ItemsContext from "../context/items-context";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const Footer = (props) => {
    const itemsCtx = useContext(ItemsContext);

    const [value, setValue] = React.useState(itemsCtx.switchPage ? 1 : 0);

    return (
        <BottomNavigation
            {...props}
            sx={{
                width: "100%",
                position: "sticky",
                bottom: 0,
                backgroundColor: "lightgray",
            }}
            value={value}
            onChange={(e, newValue) => {
                setValue(newValue);
                itemsCtx.togglePage();
            }}
            showLabels
        >
            {itemsCtx.switchPage && (
                <BottomNavigationAction
                    label="Users"
                    icon={<AccessibilityNewIcon />}
                />
            )}
            {!itemsCtx.switchPage && (
                <BottomNavigationAction
                    label="Admin"
                    icon={<AdminPanelSettingsIcon />}
                />
            )}
        </BottomNavigation>
    );
};

export default Footer;
