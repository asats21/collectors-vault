import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tagWeights, sortSatsByWeight } from './tagWeights';
import { tagIcons } from "./RenderTags";
import SatsTable from './SatsTable';
import { LeaderboardWallets } from './LeaderboardWallets';

const LeaderboardEntry = () => {
  const { address } = useParams(); // Get address from URL parameter
  const [currentPage, setCurrentPage] = useState(0);
  const satsPerPage = 20;
  const [activeFilter, setActiveFilter] = useState(null);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get the collection for the specified address
  const satCollection = LeaderboardWallets[address] || {};

  // Get sorted SATs or empty array if no collection
  const sortedSats = Object.keys(satCollection).length > 0 
    ? sortSatsByWeight(satCollection, tagWeights)
    : [];

  const filteredSats = activeFilter
    ? sortedSats.filter(satObj => satObj.details.tags.includes(activeFilter))
    : sortedSats;

  const pageCount = Math.ceil(filteredSats.length / satsPerPage);
  const offset = currentPage * satsPerPage;
  const currentSats = filteredSats.slice(offset, offset + satsPerPage);

  // Define filter options
  const filterOptions = [
    { key: 'uncommon', icon: tagIcons['uncommon']?.icon, tooltip: tagIcons['uncommon']?.tooltip },
    { key: 'black_uncommon', icon: tagIcons['black_uncommon']?.icon, tooltip: tagIcons['black_uncommon']?.tooltip },
    { key: 'alpha', icon: tagIcons['alpha']?.icon, tooltip: tagIcons['alpha']?.tooltip },
    { key: 'omega', icon: tagIcons['omega']?.icon, tooltip: tagIcons['omega']?.tooltip },
    { key: 'palindrome', icon: tagIcons['palindrome']?.icon, tooltip: tagIcons['palindrome']?.tooltip },
    { key: 'uniform_palinception', icon: tagIcons['uniform_palinception']?.icon, tooltip: tagIcons['uniform_palinception']?.tooltip },
    { key: 'perfect_palinception', icon: tagIcons['perfect_palinception']?.icon, tooltip: tagIcons['perfect_palinception']?.tooltip },
    { key: 'jpeg', icon: tagIcons['jpeg']?.icon, tooltip: tagIcons['jpeg']?.tooltip },
    { key: 'pizza', icon: tagIcons['pizza']?.icon, tooltip: tagIcons['pizza']?.tooltip },
    { key: 'hitman', icon: tagIcons['hitman']?.icon, tooltip: tagIcons['hitman']?.tooltip },
    { key: 'vintage', icon: tagIcons['vintage']?.icon, tooltip: tagIcons['vintage']?.tooltip },
    { key: 'paliblock', icon: tagIcons['paliblock']?.icon, tooltip: tagIcons['paliblock']?.tooltip },
    { key: 'rodarmor_name', icon: tagIcons['rodarmor_name']?.icon, tooltip: tagIcons['rodarmor_name']?.tooltip },
    { key: 'prime', icon: tagIcons['prime']?.icon, tooltip: tagIcons['prime']?.tooltip },
    { key: '2009', icon: tagIcons['2009']?.icon, tooltip: tagIcons['2009']?.tooltip },
    { key: 'nova', icon: tagIcons['nova']?.icon, tooltip: tagIcons['nova']?.tooltip },
  ];

  const toggleFilter = (tag) => {
    setActiveFilter((prevTag) => (prevTag === tag ? null : tag));
    setCurrentPage(0); // Reset to first page when applying a filter
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="leaderboard-item-page-header mt-4 mt-md-2">
        <h1>{address}'s Collection</h1>
        <div className='fw-bold'>
          {Object.keys(satCollection).length > 0 
            ? `${filteredSats.length} items`
            : "No sats found for this address"}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sat-tags d-flex justify-content-start align-items-center gap-3 mt-2 mb-4">
        {filterOptions.map(option => (
          <span
            key={option.key}
            onClick={() => toggleFilter(option.key)}
            style={{
              cursor: 'pointer',
              border: activeFilter === option.key ? "1px solid #C38BFA" : "",
              boxShadow: activeFilter === option.key ? "0 0 10px #C38BFA" : "",
            }}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={option.tooltip}
          >
            {option.icon}
          </span>
        ))}
      </div>

      <SatsTable
        currentSats={currentSats}
        offset={offset}
        handleDelete={() => {}} // Disabled for leaderboard view
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        isReadOnly={true}
      />

    </div>
  );
};

export default LeaderboardEntry;