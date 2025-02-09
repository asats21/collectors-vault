import React from 'react';
import { tagWeights, getWeightStats } from './tagWeights';
import { LeaderboardWallets } from './LeaderboardWallets';
import { RenderTags } from "./RenderTags";
import { getSubPaliLength, displayUniformPalinception } from "./TagDetection";
import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';
import { FaCrown } from "react-icons/fa6";
import { MdOutlineNumbers } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";

const Leaderboard = () => {
  // Calculate stats for each wallet
  const walletData = Object.entries(LeaderboardWallets).map(([wallet, satCollection]) => {
    const stats = getWeightStats(satCollection, tagWeights);
    return {
      wallet,
      ...stats, // Spread the stats (totalWeight, numberOfItems, heaviestSat)
    };
  });

  // Sort wallets by total weight (descending)
  const sortedWalletData = walletData.sort((a, b) => b.totalWeight - a.totalWeight);

  const displaySatNumber = (sat) => {
    const subPaliLength = getSubPaliLength(sat);
    if (subPaliLength) {
      return '#' + displayUniformPalinception(sat, subPaliLength);
    }
    if(isRodarmorName(sat)) {
      return getRodarmorName(sat);
    }

    return '#' + sat;
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header mt-4 mt-md-2" style={{"margin-bottom": "0px"}}>
        <h1>Demo Leaderboard</h1>
      </div>
      <p>Discover how your collection ranks among our demo wallets</p>

      {/* Leaderboard Table */}
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Wallet</th>
              <th scope="col">Score</th>
              <th scope="col"><FaCrown className="icon" style={{ color: "#F2A900" }} /> <MdOutlineNumbers className="icon" style={{ color: "#F2A900" }} /></th>
              <th scope="col"><FaCrown className="icon" style={{ color: "#F2A900" }} /> <BiSolidPurchaseTag  className="icon" style={{ color: "#F2A900" }} /></th>
              <th scope="col">Items</th>
            </tr>
          </thead>
          <tbody>
            {sortedWalletData.map(({ wallet, totalWeight, numberOfItems, heaviestSat }, index) => (
              <tr key={wallet}>
                <th scope="row">{index + 1}</th>
                <td>{wallet}</td>
                <td>{totalWeight}</td>
                <td>{displaySatNumber(heaviestSat.sat)}</td>
                <td><div className="sat-tags"><RenderTags tags={heaviestSat.details.tags} /></div></td>
                <td>{numberOfItems}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;