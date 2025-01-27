import React, { useState } from 'react';
import { tagWeights } from './tagWeights';
import { addSatsToCollection, deleteSatFromCollection } from './satUtils';
import AddSatsModal from './AddSatsModal';
import SatsTable from './SatsTable';

import { FaPlusSquare } from "react-icons/fa";

const MySats = ({ satCollection, setSatCollection }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const satsPerPage = 20;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSatCollection((prev) => addSatsToCollection(input, prev));
      setInput('');
      setShowModal(false);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all your sats?')) {
      setSatCollection({});
    }
  };

  // Calculate weight sum for each sat
  const satsWithWeights = Object.entries(satCollection).map(([sat, details]) => {
    const weightSum = details.tags.reduce((sum, tag) => sum + (tagWeights[tag] || 0), 0);
    return { sat, details, weightSum };
  });

  // Sort sats by weight sum (descending)
  const sortedSats = satsWithWeights.sort((a, b) => b.weightSum - a.weightSum);

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
    <div className="my-sats-container">
      {/* Header + Add Button */}
      <div className="sats-header">
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

      {/* Delete All Button */}
      {satCollection && Object.keys(satCollection).length > 0 &&
        <div className="text-center mt-4">
          <button
            className="nav-button delete-all"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>
      }

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