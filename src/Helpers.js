import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';
import { getSubPaliLength, displayUniformPalinception } from "./TagDetection";
import { getFormattedSupply } from "./Rarities";

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