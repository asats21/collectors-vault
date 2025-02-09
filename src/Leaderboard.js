import React from 'react';
import { tagWeights, getTotalWeight } from './tagWeights';
import { LeaderboardWallets } from './LeaderboardWallets';

const Leaderboard = () => {

  // Calculate total weight and number of items for each wallet
  const walletData = Object.entries(LeaderboardWallets).map(([wallet, satCollection]) => ({
    wallet,
    totalWeight: getTotalWeight(satCollection, tagWeights), // Use your getTotalWeight function
    numberOfItems: Object.keys(satCollection).length, // Count the number of items in the collection
  }));

  // Sort wallets by total weight (descending)
  const sortedWalletData = walletData.sort((a, b) => b.totalWeight - a.totalWeight);

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header mt-4 mt-md-2" style={{"margin-bottom": "0px"}}>
        <h1>Demo Leaderboard</h1>
      </div>
      <p>See where your collection stands in our demo wallets list</p>

      {/* Leaderboard Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Wallet</th>
              <th scope="col">Score</th>
              <th scope="col">Number of Items</th>
            </tr>
          </thead>
          <tbody>
            {sortedWalletData.map(({ wallet, totalWeight, numberOfItems }, index) => (
              <tr key={wallet}>
                <th scope="row">{index + 1}</th>
                <td>{wallet}</td>
                <td>{totalWeight}</td>
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