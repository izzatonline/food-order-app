import React from "react";
import "./Banner.css";

const Banner = () => {
    return (
        <div className="banner-container">
            <img
                className="banner-image"
                src="/image/banner.jpg"
                alt="banner"
            />
            Image by{" "}
            <a href="https://www.freepik.com/free-vector/restaurant-mural-wallpaper_10498711.htm#query=food%20wallpaper&position=0&from_view=keyword&track=ais">
                Freepik
            </a>
        </div>
    );
};

export default Banner;
