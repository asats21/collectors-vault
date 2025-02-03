import React from "react";
import { FaGem, FaRegGem, FaPizzaSlice, FaHourglass, FaCrosshairs, FaImage, FaBook } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { TbAlpha, TbOmega } from "react-icons/tb";
import { PiNumberNineFill } from "react-icons/pi";
import { GiCamel } from "react-icons/gi";
import { LuFence } from "react-icons/lu";

export const tagIcons = {
    block_9: { icon: <PiNumberNineFill  className="icon" style={{ color: "#fff" }} />, number: 2, tooltip: "First transaction block" },
    "450x": { icon: <div className="fw-bold">450x</div>, number: 1, tooltip: "The first Bitcoin in the very first transaction" },

    alpha: { icon: <TbAlpha className="icon" style={{ color: "#FF6F00" }} />, number: 2, tooltip: "Alpha" },
    omega: { icon: <TbOmega className="icon" style={{ color: "#118AB2" }} />, number: 2, tooltip: "Omega" },
    uncommon: { icon: <FaGem className="icon" style={{ color: "#ED2B9C" }} />, number: 1, tooltip: "Uncommon" },
    black_uncommon: { icon: <FaRegGem className="icon" style={{ color: "#999" }} />, number: 1, tooltip: "Black Uncommon" },
    pizza: { icon: <FaPizzaSlice className="icon" style={{ color: "#F2A900" }} />, number: 2, tooltip: "Pizza" },
    jpeg: { icon: <FaImage className="icon" style={{ color: "#037F5E" }} />, number: 2, tooltip: "JPEG" },
    hitman: { icon: <FaCrosshairs className="icon" style={{ color: "#E05C5C" }} />, number: 2, tooltip: "Hitman" },
    silkroad: { icon: <GiCamel className="icon" style={{ color: "#F2A900" }} />, number: 2, tooltip: "Silkroad First Auction" },
    palindrome: { icon: <FaBluesky className="icon" style={{ color: "#6AA8C3" }} />, number: 1, tooltip: "Palindrome" },
    sequence: { icon: <LuFence className="icon" style={{ color: "#6AA8C3" }} />, number: 10, tooltip: "Sequence Palindrome" },
    uniform_palinception: { icon: <><FaBluesky className="icon" style={{ color: "#118AB2" }} /><FaBluesky className="icon" style={{ color: "#118AB2" }} /></>, number: 2, tooltip: "Uniform Palinception" },
    perfect_palinception: { icon: <><FaBluesky className="icon" style={{ color: "#E89A02" }} /><FaBluesky className="icon" style={{ color: "#E89A02" }} /></>, number: 3, tooltip: "Perfect Palinception" },
    paliblock: { icon: <FaBluesky className="icon" style={{ color: "#118AB2", padding: "1px", border: "1px solid #118AB2" }} />, number: 10, tooltip: "PaliBlock" },
    vintage: { icon: <FaHourglass className="icon" style={{ color: "#F6BB41" }} />, number: 2, tooltip: "Vintage" },
    "2_digits": { icon: <div className="fw-bold">2D</div>, number: 5, tooltip: "2 Digits" },
    "3_digits": { icon: <div className="fw-bold">3D</div>, number: 5, tooltip: "3 Digits" },
    epoch0: { icon: <div className="fw-bold">E0</div>, number: 10, tooltip: "Epoch 0" },
    "nova": { icon: <div className="fw-bold">Nova</div>, number: 20, tooltip: "Palindromes created after the first halving" },
    "2009": { icon: <div className="fw-bold">2009</div>, number: 8, tooltip: "Mined in 2009" },
    pali_uncommon: { icon: <><FaGem className="icon" style={{ color: "#ED2B9C" }} />&nbsp;<FaBluesky className="icon" style={{ color: "#ED2B9C" }} /></>, number: 2, tooltip: "Palindromic Uncommon" },
    pali_black_uncommon: { icon: <><FaRegGem className="icon" style={{ color: "#999" }} />&nbsp;<FaBluesky className="icon" style={{ color: "#999" }} /></>, number: 2, tooltip: "Palindromic Black Uncommon" },
    rodarmor_name: { icon: <FaBook className="icon" style={{ color: "#ccc" }} />, number: 1, tooltip: "Rodarmor Name" },
    "pizza_4/20": { icon: <div className="fw-bold d-inline-flex align-items-center text-nowrap" style={{ color: "#F2A900" }}><FaPizzaSlice className="icon"/>&nbsp;4/20</div>, number: 2, tooltip: "Pizza sats mined on 4/20/2010" },
    "pizza_2009": { icon: <div className="fw-bold d-inline-flex align-items-center text-nowrap" style={{ color: "#F2A900" }}><FaPizzaSlice className="icon"/>&nbsp;2009</div>, number: 2, tooltip: "Jpeg sats mined in 2009" },
    "jpeg_2010": { icon: <div className="fw-bold d-inline-flex align-items-center text-nowrap" style={{ color: "#037F5E" }}><FaImage className="icon" />&nbsp;2010</div>, number: 2, tooltip: "Jpeg sats mined in 2010" },
};

export function RenderTags({ tags }) {
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