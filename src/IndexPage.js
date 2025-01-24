import React, { useState } from 'react';

import { isPalindrome, isPerfectPalinception, isUniformPalinception } from './Helpers';
import { isPizza } from './Pizza';

const IndexPage = ({ satCollection, setSatCollection }) => {

    const handleAddSats = (input) => {
        const newSats = input
          .split(/\s*,\s*|\s+/) // Split by comma or whitespace
          .filter(Boolean); // Remove empty strings
      
        setSatCollection((prevCollection) => {
          const updatedCollection = { ...prevCollection };
          newSats.forEach((sat) => {
            const satNumber = Number(sat);  // Convert to number
      
            if (!updatedCollection[sat]) {
              updatedCollection[sat] = {
                tags: [],
                block_number: null,
                price: null,
              };
            }
      
            if (isPizza(satNumber)) {
              updatedCollection[sat].tags.push('pizza');
            }
    
            if (isPalindrome(satNumber)) {
              updatedCollection[sat].tags.push('palindrome');
            }
    
            if (isUniformPalinception(satNumber)) {
              updatedCollection[sat].tags.push('uniform');
            }
    
            if (isPerfectPalinception(satNumber)) {
              updatedCollection[sat].tags.push('perfect');
            }
    
          });
          return updatedCollection;
        });
      };
    
      const handleDeleteSat = (sat) => {
        setSatCollection((prevCollection) => {
          const updatedCollection = { ...prevCollection };
          delete updatedCollection[sat];
          return updatedCollection;
        });
      };
    
      function TextAreaInput({ onAddSats }) {
        const [input, setInput] = useState('');
      
        const handleSubmit = (e) => {
          e.preventDefault();
          if (input.trim()) {
            onAddSats(input);
            setInput('');
          }
        };
      
        return (
          <form onSubmit={handleSubmit}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter sat numbers separated by comma or whitespace"
              rows="5"
              cols="50"
            />
            <br />
            <button
              type="submit"
              style={{
                backgroundColor: "#343a40", // Dark grey background
                color: "#ffffff",          // White text
                border: "1px solid #444",  // Subtle border
                borderRadius: "4px",       // Rounded corners
                padding: "8px 16px",       // Padding for better size
                fontSize: "16px",          // Increase font size
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#495057")} // Lighter hover effect
              onMouseOut={(e) => (e.target.style.backgroundColor = "#343a40")}
            >
            Add Sats
          </button>
          </form>
        );
      }

    function SatList({ collection }) {
    return (
        <div className="table-responsive">
        <table className="table table-dark table-striped">
            <thead
            style={{
                border: "1px solid #444",
                minWidth: "800px", // Ensure the table is readable on smaller screens
            }}
            >
            <tr>
                <th>Sat Number</th>
                <th>Tags</th>
                <th>Block Number</th>
                <th>Price</th>
                <th>Actions</th> {/* Add a column for actions */}
            </tr>
            </thead>
            <tbody>
            {Object.entries(collection).map(([sat, details]) => (
                <tr key={sat}>
                <td>{sat}</td>
                <td>{details.tags.join(', ')}</td>
                <td>{details.block_number || 'N/A'}</td>
                <td>{details.price !== null ? details.price : 'N/A'}</td>
                <td>
                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteSat(sat)}
                    >
                    &times; {/* Red cross symbol */}
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }

  return (
    <div>
        <h1 className="text-center mb-4">Rare Sats Collector</h1>
        <div className="card shadow-sm p-4">
          <TextAreaInput onAddSats={handleAddSats} />
        </div>
        <div className="mt-4">
          <SatList collection={satCollection} />
        </div>
    </div>
  );
};

export default IndexPage;