import React, { useEffect } from "react";
import { FaGem, FaRegGem, FaPizzaSlice, FaHourglass, FaCrosshairs, FaImage } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { TbAlpha, TbOmega } from "react-icons/tb";
import { Tooltip } from "bootstrap";

export const tagIcons = {
    alpha: { icon: <TbAlpha className="icon" style={{ color: "#FF6F00" }} />, number: 2, tooltip: "Alpha" },
    omega: { icon: <TbOmega className="icon" style={{ color: "#118AB2" }} />, number: 2, tooltip: "Omega" },
    uncommon: { icon: <FaGem className="icon" style={{ color: "#ED2B9C" }} />, number: 1, tooltip: "Uncommon" },
    black_uncommon: { icon: <FaRegGem className="icon" style={{ color: "#999" }} />, number: 1, tooltip: "Black Uncommon" },
    pizza: { icon: <FaPizzaSlice className="icon" style={{ color: "#F2A900" }} />, number: 2, tooltip: "Pizza" },
    jpeg: { icon: <FaImage className="icon" style={{ color: "#037F5E" }} />, number: 2, tooltip: "JPEG" },
    hitman: { icon: <FaCrosshairs className="icon" style={{ color: "#E05C5C" }} />, number: 2, tooltip: "Hitman" },
    palindrome: { icon: <FaBluesky className="icon" style={{ color: "#6AA8C3" }} />, number: 1, tooltip: "Palindrome" },
    uniform: { icon: <><FaBluesky className="icon" style={{ color: "#118AB2" }} /><FaBluesky className="icon" style={{ color: "#118AB2" }} /></>, number: 2, tooltip: "Uniform Palinception" },
    perfect: { icon: <><FaBluesky className="icon" style={{ color: "#E89A02" }} /><FaBluesky className="icon" style={{ color: "#E89A02" }} /></>, number: 3, tooltip: "Perfect Palinception" },
    paliblock: { icon: <FaBluesky className="icon" style={{ color: "#118AB2", padding: "1px", border: "1px solid #118AB2" }} />, number: 10, tooltip: "PaliBlock" },
    vintage: { icon: <FaHourglass className="icon" style={{ color: "#F6BB41" }} />, number: 2, tooltip: "Vintage" },
    "2_digits": { icon: <div className="fw-bold">2D</div>, number: 5, tooltip: "2 Digits" },
    "3_digits": { icon: <div className="fw-bold">3D</div>, number: 5, tooltip: "3 Digits" },
    epoch0: { icon: <div className="fw-bold">E0</div>, number: 10, tooltip: "Epoch 0" },
    "epoch1+": { icon: <div className="fw-bold">E1+</div>, number: 10, tooltip: "Epoch 1+" },
    "2009": { icon: <div className="fw-bold">2009</div>, number: 8, tooltip: "Mined in 2009" },
    pali_uncommon: { icon: <><FaGem className="icon" style={{ color: "#ED2B9C" }} />&nbsp;<FaBluesky className="icon" style={{ color: "#ED2B9C" }} /></>, number: 2, tooltip: "Palindromic Uncommon" },
    pali_black_uncommon: { icon: <><FaRegGem className="icon" style={{ color: "#999" }} />&nbsp;<FaBluesky className="icon" style={{ color: "#999" }} /></>, number: 2, tooltip: "Palindromic Black Uncommon" },
};

export function RenderTags({ tags }) {
    useEffect(() => {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipEl) => new Tooltip(tooltipEl));
    }, []);

    const sortedTags = tags
        .map((tag) => {
            const tagInfo = tagIcons[tag];
            if (tagInfo) {
                return { type: "icon", ...tagInfo }; // Return the icon and number if it exists
            }
            return { type: "tag", tag }; // Return the tag text if no icon
        })
        .sort((a, b) => {
            // Sort by the number of the icon first
            return a.type === "icon" && b.type === "icon" ? a.number - b.number : a.type === "icon" ? -1 : 1;
        });

    return (
        <>
            {sortedTags.map((item, index) =>
                item.type === "icon" ? (
                    <span
                        key={index}
                        className="me-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={item.tooltip}
                    >
                        {item.icon}
                    </span>
                ) : (
                    <span key={item.tag} className={`tag-${item.tag.replace(" ", "-")} me-1`}>
                        {item.tag}
                    </span>
                )
            )}
        </>
    );
}