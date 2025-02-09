import React from 'react';
import { Link } from 'react-router-dom';
import { tagWeights, getWeightStats } from './tagWeights';
import { LeaderboardWallets } from './LeaderboardWallets';
import { RenderTags } from "./RenderTags";
import { getSubPaliLength, displayUniformPalinception } from "./TagDetection";
import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';
import { FaCrown } from "react-icons/fa6";
import { MdOutlineNumbers } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";

const Leaderboard = ({ satCollection }) => {
  // Add the user's collection to the leaderboard data
  const leaderboardData = {
    ...LeaderboardWallets,
    myCollection: satCollection, // Use "myCollection" as the key for the user's collection
  };

  // Calculate stats for each wallet
  const walletData = Object.entries(leaderboardData).map(([wallet, collection]) => {
    const stats = getWeightStats(collection, tagWeights);
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
    if (isRodarmorName(sat)) {
      return getRodarmorName(sat);
    }
    return '#' + sat;
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header mt-4 mt-md-2" style={{ marginBottom: "0px" }}>
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
              <th scope="col"><FaCrown className="icon" style={{ color: "#F2A900" }} /> <BiSolidPurchaseTag className="icon" style={{ color: "#F2A900" }} /></th>
              <th scope="col">Items</th>
            </tr>
          </thead>
          <tbody>
            {sortedWalletData.map(({ wallet, totalWeight, numberOfItems, heaviestSat }, index) => (
              <tr
                key={wallet}
                className={wallet === "myCollection" ? "user-collection-row" : ""} // Add a class for the user's collection
              >
                <th scope="row">{index + 1}</th>
                <td>
                  {wallet === "myCollection" ? (
                    <strong>My Collection</strong> // Display "My Collection" for the user
                  ) : (
                    <Link to={`/leaderboard/` + wallet} style={{ color: "#fff" }}>
                      {wallet}
                    </Link>
                  )}
                </td>
                <td>{totalWeight}</td>
                <td>{displaySatNumber(heaviestSat.sat)}</td>
                <td>
                  <div className="sat-tags">
                    <RenderTags tags={heaviestSat.details.tags} />
                  </div>
                </td>
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