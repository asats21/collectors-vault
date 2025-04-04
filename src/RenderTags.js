import React from "react";
import { FaGem, FaRegGem, FaPizzaSlice, FaHourglass, FaCrosshairs, FaImage, FaBook } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { TbAlpha, TbOmega } from "react-icons/tb";
import { PiNumberNineFill, PiEmpty } from "react-icons/pi";
import { GiCamel } from "react-icons/gi";
import { MdRepeatOn } from "react-icons/md";
import { BsIncognito } from "react-icons/bs";
import { FaParking } from "react-icons/fa";

export const tagIcons = {
    block_9: { icon: <PiNumberNineFill  className="icon" style={{ color: "#fff" }} />, number: 2, tooltip: "First transaction block" },
    block_78: { icon: <div className="fw-bold" style={{ color: "#EF506A" }}>B78</div>, number: 2, tooltip: "Block mined by Hal Finney" },
    block_286: { icon: <div className="fw-bold" style={{ color: "#0174F8" }}>B286</div>, number: 2, tooltip: "The second Bitcoin block, thought to be mined by Satoshi Nakamoto" },
    "450x": { icon: <div className="fw-bold">450x</div>, number: 1, tooltip: "The first Bitcoin in the very first transaction" },
    alpha: { icon: <TbAlpha className="icon" style={{ color: "#FF6F00" }} />, number: 2, tooltip: "Alpha" },
    omega: { icon: <TbOmega className="icon" style={{ color: "#118AB2" }} />, number: 2, tooltip: "Omega" },
    uncommon: { icon: <FaGem className="icon" style={{ color: "#ED2B9C" }} />, number: 1, tooltip: "Uncommon" },
    black_uncommon: { icon: <FaRegGem className="icon" style={{ color: "#999" }} />, number: 1, tooltip: "Black Uncommon" },
    pizza: { icon: <FaPizzaSlice className="icon" style={{ color: "#F2A900" }} />, number: 3, tooltip: "Pizza" },
    jpeg: { icon: <FaImage className="icon" style={{ color: "#037F5E" }} />, number: 3, tooltip: "JPEG" },
    hitman: { icon: <FaCrosshairs className="icon" style={{ color: "#E05C5C" }} />, number: 3, tooltip: "Hitman" },
    silkroad: { icon: <GiCamel className="icon" style={{ color: "#F2A900" }} />, number: 3, tooltip: "Silkroad First Auction" },
    palindrome: { icon: <FaBluesky className="icon" style={{ color: "#6AA8C3" }} />, number: 1, tooltip: "Palindrome" },
    sequence: { icon: <MdRepeatOn className="icon" style={{ color: "#6AA8C3" }} />, number: 10, tooltip: "Sequence Palindrome" },
    uniform_palinception: { icon: <><FaBluesky className="icon" style={{ color: "#118AB2" }} /><FaBluesky className="icon" style={{ color: "#118AB2" }} /></>, number: 2, tooltip: "Uniform Palinception" },
    perfect_palinception: { icon: <><FaBluesky className="icon" style={{ color: "#E89A02" }} /><FaBluesky className="icon" style={{ color: "#E89A02" }} /></>, number: 3, tooltip: "Perfect Palinception" },
    paliblock: { icon: <FaBluesky className="icon" style={{ color: "#118AB2", padding: "1px", border: "1px solid #118AB2" }} />, number: 10, tooltip: "PaliBlock" },
    vintage: { icon: <FaHourglass className="icon" style={{ color: "#F6BB41" }} />, number: 3, tooltip: "Vintage" },
    "2_digits": { icon: <div className="fw-bold" style={{ color: "#E89A02" }}>2D</div>, number: 5, tooltip: "2 Digits" },
    "3_digits": { icon: <div className="fw-bold" style={{ color: "#DDD" }}>3D</div>, number: 5, tooltip: "3 Digits" },
    epoch0: { icon: <div className="fw-bold">E0</div>, number: 10, tooltip: "Epoch 0" },
    "nova": { icon: <div className="fw-bold">Nova</div>, number: 20, tooltip: "Palindromes created after the first halving" },
    "2009": { icon: <div className="fw-bold">2009</div>, number: 8, tooltip: "Mined in 2009" },
    pali_uncommon: { icon: <><FaGem className="icon" style={{ color: "#ED2B9C" }} />&nbsp;<FaBluesky className="icon" style={{ color: "#ED2B9C" }} /></>, number: 2, tooltip: "Palindromic Uncommon" },
    pali_black_uncommon: { icon: <><FaRegGem className="icon" style={{ color: "#999" }} />&nbsp;<FaBluesky className="icon" style={{ color: "#999" }} /></>, number: 2, tooltip: "Palindromic Black Uncommon" },
    rodarmor_name: { icon: <FaBook className="icon" style={{ color: "#ccc" }} />, number: 1, tooltip: "Rodarmor Name" },
    "pizza_4/20": { icon: <div className="fw-bold d-inline-flex align-items-center text-nowrap" style={{ color: "#F2A900" }}><FaPizzaSlice className="icon"/>&nbsp;4/20</div>, number: 3, tooltip: "Pizza sats mined on 4/20/2010" },
    "pizza_2009": { icon: <div className="fw-bold d-inline-flex align-items-center text-nowrap" style={{ color: "#F2A900" }}><FaPizzaSlice className="icon"/>&nbsp;2009</div>, number: 2, tooltip: "Pizza sats mined in 2009" },
    "jpeg_2010": { icon: <div className="fw-bold d-inline-flex align-items-center text-nowrap" style={{ color: "#037F5E" }}><FaImage className="icon" />&nbsp;2010</div>, number: 5, tooltip: "Jpeg sats mined in 2010" },
    nakamoto: { icon: <BsIncognito className="icon" style={{ color: "#ccc" }} />, number: 1, tooltip: "Sats mined by Satoshi Nakamoto himself" },
    "uniform_3/5": { icon: <div className="fw-bold">3/5</div>, number: 20, tooltip: "Uniform palinception with sub-palindrome lengths of both 3 and 5 simultaneously" },
    "prime": { icon: <FaParking className="icon" style={{ color: "#FF6F00" }} />, number: 20, tooltip: "Prime Number" },
    tz_10: { icon: <div className="fw-bold d-inline-flex align-items-center" style={{ color: "#ED2B9C" }}><PiEmpty /> 10</div>, number: 10, tooltip: "Uncommon sat with 10 trailing zeroes" },
    tz_11: { icon: <div className="fw-bold d-inline-flex align-items-center" style={{ color: "#ED2B9C" }}><PiEmpty /> 11</div>, number: 10, tooltip: "Uncommon sat with 11 trailing zeroes" },
    tz_12: { icon: <div className="fw-bold d-inline-flex align-items-center" style={{ color: "#ED2B9C" }}><PiEmpty /> 12</div>, number: 10, tooltip: "Uncommon sat with 12 trailing zeroes" },
    tz_13: { icon: <div className="fw-bold d-inline-flex align-items-center" style={{ color: "#ED2B9C" }}><PiEmpty /> 13</div>, number: 10, tooltip: "Uncommon sat with 13 trailing zeroes" },
    tz_14: { icon: <div className="fw-bold d-inline-flex align-items-center" style={{ color: "#ED2B9C" }}><PiEmpty /> 14</div>, number: 10, tooltip: "Uncommon sat with 14 trailing zeroes" },
    tz_15: { icon: <div className="fw-bold d-inline-flex align-items-center" style={{ color: "#ED2B9C" }}><PiEmpty /> 15</div>, number: 10, tooltip: "Uncommon sat with 15 trailing zeroes" },
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