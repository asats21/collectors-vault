import React, { useState } from 'react';
import { tagWeights, sortSatsByWeight } from './tagWeights';
import { addSatsToCollection, deleteSatFromCollection } from './satManagement';
import AddSatsModal from './AddSatsModal';
import SatsTable from './SatsTable';
import { tagIcons } from "./RenderTags";

import { FaPlusSquare } from "react-icons/fa";

const MySats = ({ satCollection, setSatCollection, settings }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const satsPerPage = 20;
  const [activeFilter, setActiveFilter] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSatCollection((prev) => addSatsToCollection(input, prev, settings));
      setInput('');
      setShowModal(false);
    }
  };

  const sortedSats = sortSatsByWeight(satCollection, tagWeights);
  const filteredSats = activeFilter
    ? sortedSats.filter(satObj => satObj.details.tags.includes(activeFilter))
    : sortedSats;

  // Pagination logic
  const pageCount = Math.ceil(filteredSats.length / satsPerPage);
  const offset = currentPage * satsPerPage;
  const currentSats = filteredSats.slice(offset, offset + satsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (sat) => {
    setSatCollection((prev) => deleteSatFromCollection(sat, prev));
  };

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
    <div className="mt-2">
      {/* Header + Add Button */}
      <div className="my-sats-header mt-4 mt-md-2">
        <h1>My Sats</h1>
        <button
          className="add-sats-button"
          onClick={() => setShowModal(true)}
        >
          <FaPlusSquare/> Add Sats
        </button>
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

      {/* Sats Table */}
      <SatsTable
        currentSats={currentSats}
        offset={offset}
        handleDelete={handleDelete}
        pageCount={pageCount}
        handlePageClick={handlePageClick}
      />

      {/* Add Sats Modal */}
      <AddSatsModal
        showModal={showModal}
        setShowModal={setShowModal}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </div>

    
  );
};

export default MySats;