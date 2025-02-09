import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tagWeights, sortSatsByWeight } from './tagWeights';
import SatsTable from './SatsTable';
import { LeaderboardWallets } from './LeaderboardWallets';

const LeaderboardEntry = () => {
  const { address } = useParams(); // Get address from URL parameter
  const [currentPage, setCurrentPage] = useState(0);
  const satsPerPage = 20;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get the collection for the specified address
  const satCollection = LeaderboardWallets[address] || {};
  
  // Get sorted SATs or empty array if no collection
  const sortedSats = Object.keys(satCollection).length > 0 
    ? sortSatsByWeight(satCollection, tagWeights)
    : [];

  const pageCount = Math.ceil(sortedSats.length / satsPerPage);
  const offset = currentPage * satsPerPage;
  const currentSats = sortedSats.slice(offset, offset + satsPerPage);

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header mt-4 mt-md-2">
        <h1>{address}'s Collection</h1>
        <div className='fw-bold'>
          {Object.keys(satCollection).length > 0 
            ? `${sortedSats.length} items`
            : "No sats found for this address"}
        </div>
      </div>

      {/* Sats Table */}
      {sortedSats.length > 0 ? (
        <SatsTable
          currentSats={currentSats}
          offset={offset}
          handleDelete={() => {}} // Disabled for leaderboard view
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          isReadOnly={true} // Add this prop if your SatsTable needs to know it's view-only
        />
      ) : (
        <div className="alert alert-warning">
          No SATs found in this collection
        </div>
      )}
    </div>
  );
};

export default LeaderboardEntry;