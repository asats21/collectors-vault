import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';
import { isPaliblock, getSubPaliLength, displayUniformPalinception } from "./TagDetection";
import { getFormattedSupply } from "./Rarities";
import { FaCube } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';

export const displaySatNumber = (sat) => {
    const subPaliLength = getSubPaliLength(sat);
    if (subPaliLength) {
      return (<span className='small'>{displayUniformPalinception(sat, subPaliLength)}</span>);
    }
    if(isRodarmorName(sat)) {
      return getRodarmorName(sat);
    }

    return sat;
}

export const renderRarity = (tags) => {
    const supply = getFormattedSupply(tags);
    return supply ? <div className='small text-center mt-3 fw-bold'>1 / {supply.total}</div> : null;
}

export const renderYear = (details) => {
    if (details.tags.includes("nova")) {
      return `${details.year} | Epoch ${details.epoch}`;
    }
    return details.year;
};

export const renderBlockNumber = (details) => {
  return (
  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
    {isPaliblock(details.block_number) ? 
      <FaBluesky className="icon" style={{ color: '#118AB2', padding: '1px', border: '1px solid #118AB2' }}/>
      : <FaCube />
    } {details.block_number}
  </span>
  )
}