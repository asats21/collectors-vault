import React, { useState } from 'react';
import { tagWeights, sortSatsByWeight } from './tagWeights';
import { addSatsToCollection, deleteSatFromCollection } from './satManagement';
import AddSatsModal from './AddSatsModal';
import SatsTable from './SatsTable';

import { FaPlusSquare } from "react-icons/fa";

const MySats = ({ satCollection, setSatCollection, settings }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const satsPerPage = 20;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSatCollection((prev) => addSatsToCollection(input, prev, settings));
      setInput('');
      setShowModal(false);
    }
  };

  const sortedSats = sortSatsByWeight(satCollection, tagWeights);

  // Pagination logic
  const pageCount = Math.ceil(sortedSats.length / satsPerPage);
  const offset = currentPage * satsPerPage;
  const currentSats = sortedSats.slice(offset, offset + satsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (sat) => {
    setSatCollection((prev) => deleteSatFromCollection(sat, prev));
  };

  return (
    <div className="mt-2">
      {/* Header + Add Button */}
      <div className="sats-header mt-4 mt-md-2">
        <h1>My Sats</h1>
        <button
          className="nav-button add-sats"
          onClick={() => setShowModal(true)}
        >
          <FaPlusSquare/> Add Sats
        </button>
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