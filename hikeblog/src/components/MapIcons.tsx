import React from "react";
import { MdOutlineStarOutline } from "react-icons/md";
import PropTypes from "prop-types";

export const MapIcons = () => {
    const iconCount = 5; // Number of times you want to render the icon
    return (
        <div>
            {Array.from({ length: iconCount }).map((_, index) => (
                <MdOutlineStarOutline key={index} />
            ))}
        </div>
    );
};
